import { StablePoolEncoder } from '@/pool-stable/encoder';
import { ADDRESSES } from './addresses';
import { Relayer } from '@/modules/relayer/relayer.module';
import { ExitPoolRequest } from '@/types';
import { BatchSwapStep, FundManagement, SwapType } from '@/modules/swaps/types';
import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { MaxUint256, MaxInt256 } from '@ethersproject/constants';
// TODO - Ask Nico to update Typechain?
import balancerRelayerAbi from '@/lib/abi/BalancerRelayer.json';
const balancerRelayerInterface = new Interface(balancerRelayerAbi);

const EXIT_DAI = Relayer.toChainedReference('21');
const EXIT_USDC = Relayer.toChainedReference('22');
const EXIT_USDT = Relayer.toChainedReference('23');
const SWAP_RESULT_BBAUSD = Relayer.toChainedReference('24');

export class StaBal3Builder {
  private addresses;

  constructor(networkId: 1 | 5) {
    this.addresses = ADDRESSES[networkId];
  }

  /**
   * Builds migration call data.
   * Migrates tokens from staBal3 to bbausd2 pool.
   * Tokens that are initially staked are re-staked at the end of migration. Non-staked are not.
   *
   * @param {string}  userAddress User address.
   * @param {string}  staBal3Amount Amount of BPT tokens to migrate.
   * @param {string}  minBbausd2Out Minimum of expected BPT out ot the migration flow.
   * @param {boolean} staked Indicates whether tokens are initially staked or not.
   * @param {string}  authorisation Encoded authorisation call.
   * @returns Migration transaction request ready to send with signer.sendTransaction
   */
  calldata(
    userAddress: string,
    staBal3Amount: string,
    minBbausd2Out: string,
    staked: boolean,
    authorisation?: string
  ): {
    to: string;
    data: string;
  } {
    const relayer = this.addresses.relayer;
    let calls: string[] = authorisation
      ? [this.buildSetRelayerApproval(authorisation)]
      : [];

    if (staked) {
      calls = [
        ...calls,
        this.buildWithdraw(userAddress, staBal3Amount),
        this.buildExit(relayer, relayer, staBal3Amount),
        this.buildSwap(minBbausd2Out, relayer),
        this.buildDeposit(userAddress),
      ];
    } else {
      calls = [
        ...calls,
        this.buildExit(userAddress, relayer, staBal3Amount),
        this.buildSwap(minBbausd2Out, userAddress),
      ];
    }

    const callData = balancerRelayerInterface.encodeFunctionData('multicall', [
      calls,
    ]);

    return {
      to: this.addresses.relayer,
      data: callData,
    };
  }

  /**
   * Encodes exitPool callData.
   * Exit staBal3 pool proportionally to underlying Linear BPTs. Exits to relayer.
   * Outputreferences are used to store exit amounts for next transaction.
   *
   * @param {string} sender Sender address.
   * @param {string} recipient Recipient address.
   * @param {string} amount Amount of staBal3 BPT to exit with.
   * @returns Encoded exitPool call. Output references.
   */
  buildExit(sender: string, recipient: string, amount: string): string {
    // Goerli and Mainnet has different assets ordering
    const { assetOrder } = this.addresses.staBal3;
    const assets = assetOrder.map(
      (key) => this.addresses[key as keyof typeof this.addresses] as string
    );

    // Assume gaugeWithdraw returns same amount value
    const userData = StablePoolEncoder.exitExactBPTInForTokensOut(amount);
    // const userData = StablePoolEncoder.exitExactBPTInForOneTokenOut(
    //   amount,
    //   assetOrder.indexOf('DAI')
    // );

    // Ask to store exit outputs for batchSwap of exit is used as input to swaps
    const outputReferences = [
      { index: assetOrder.indexOf('DAI'), key: EXIT_DAI },
      { index: assetOrder.indexOf('USDC'), key: EXIT_USDC },
      { index: assetOrder.indexOf('USDT'), key: EXIT_USDT },
    ];

    const callData = Relayer.constructExitCall({
      assets,
      minAmountsOut: ['0', '0', '0'],
      userData,
      toInternalBalance: true,
      poolId: this.addresses.staBal3.id,
      poolKind: 0, // This will always be 0 to match supported Relayer types
      sender,
      recipient,
      outputReferences,
      exitPoolRequest: {} as ExitPoolRequest,
    });

    return callData;
  }

  /**
   * Creates encoded batchSwap function with following swaps: stables -> linear pools -> boosted pool
   * outputreferences should contain the amount of resulting BPT.
   *
   * @param {string} expectedBptReturn BPT amount expected out of the swap.
   * @param {string} recipient Recipient address.
   * @returns Encoded batchSwap call. Output references.
   */
  buildSwap(expectedBptReturn: string, recipient: string): string {
    const assets = [
      this.addresses.bbausd2.address,
      this.addresses.DAI,
      this.addresses.linearDai2.address,
      this.addresses.USDC,
      this.addresses.linearUsdc2.address,
      this.addresses.USDT,
      this.addresses.linearUsdt2.address,
    ];

    const outputReferences = [{ index: 0, key: SWAP_RESULT_BBAUSD }];

    // for each linear pool swap -
    // linear1Bpt[linear1]stable[linear2]linear2bpt[bbausd2]bbausd2 Uses chainedReference from previous action for amount.
    // TO DO - Will swap order matter here? John to ask Fernando.
    const swaps: BatchSwapStep[] = [
      {
        poolId: this.addresses.linearDai2.id,
        assetInIndex: 1,
        assetOutIndex: 2,
        amount: EXIT_DAI.toString(),
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd2.id,
        assetInIndex: 2,
        assetOutIndex: 0,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.linearUsdc2.id,
        assetInIndex: 3,
        assetOutIndex: 4,
        amount: EXIT_USDC.toString(),
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd2.id,
        assetInIndex: 4,
        assetOutIndex: 0,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.linearUsdt2.id,
        assetInIndex: 5,
        assetOutIndex: 6,
        amount: EXIT_USDT.toString(),
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd2.id,
        assetInIndex: 6,
        assetOutIndex: 0,
        amount: '0',
        userData: '0x',
      },
    ];

    // For tokens going in to the Vault, the limit shall be a positive number. For tokens going out of the Vault, the limit shall be a negative number.
    const limits = [
      BigNumber.from(expectedBptReturn).mul(-1).toString(),
      MaxInt256.toString(),
      '0',
      MaxInt256.toString(),
      '0',
      MaxInt256.toString(),
      '0',
    ];

    // Swap to/from Relayer
    const funds: FundManagement = {
      sender: this.addresses.relayer,
      recipient,
      fromInternalBalance: true,
      toInternalBalance: false,
    };

    const encodedBatchSwap = Relayer.encodeBatchSwap({
      swapType: SwapType.SwapExactIn,
      swaps,
      assets,
      funds,
      limits,
      deadline: MaxUint256,
      value: '0',
      outputReferences,
    });

    return encodedBatchSwap;
  }

  /**
   * Uses relayer to withdraw staked BPT from gauge and send to relayer
   *
   * @param {string} sender Sender address.
   * @param {string} amount Amount of BPT to exit with.
   * @returns withdraw call
   */
  buildWithdraw(sender: string, amount: string): string {
    return Relayer.encodeGaugeWithdraw(
      this.addresses.staBal3.gauge,
      sender,
      this.addresses.relayer,
      amount
    );
  }

  /**
   * Uses relayer to deposit user's BPT to gauge and sends to recipient
   *
   * @param {string} recipient Recipient address.
   * @returns deposit call
   */
  buildDeposit(recipient: string): string {
    return Relayer.encodeGaugeDeposit(
      this.addresses.bbausd2.gauge,
      this.addresses.relayer,
      recipient,
      SWAP_RESULT_BBAUSD.toString()
    );
  }

  /**
   * Uses relayer to approve itself to act in behalf of the user
   *
   * @param {string} authorisation Encoded authorisation call.
   * @returns relayer approval call
   */
  buildSetRelayerApproval(authorisation: string): string {
    return Relayer.encodeSetRelayerApproval(
      this.addresses.relayer,
      true,
      authorisation
    );
  }
}
