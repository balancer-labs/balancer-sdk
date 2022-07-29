import { ADDRESSES } from './addresses';
import { Relayer } from '@/modules/relayer/relayer.module';
import { BatchSwapStep, FundManagement, SwapType } from '@/modules/swaps/types';
import { Interface } from '@ethersproject/abi';
import { MaxUint256, Zero } from '@ethersproject/constants';
// TODO - Ask Nico to update Typechain?
import balancerRelayerAbi from '@/lib/abi/BalancerRelayer.json';
import { BigNumber } from '@ethersproject/bignumber';
const balancerRelayerInterface = new Interface(balancerRelayerAbi);

const SWAP_RESULT_BBAUSD = Relayer.toChainedReference('24');

export class BbaUsd1Builder {
  private addresses;

  constructor(networkId: 1 | 5) {
    this.addresses = ADDRESSES[networkId];
  }

  /**
   * Builds migration call data.
   * Migrates tokens from bbausd1 to bbausd2 pool.
   * Tokens that are initially staked are re-staked at the end of migration. Non-staked are not.
   *
   * @param {string}    userAddress User address.
   * @param {string}    bbausd1Amount Amount of BPT tokens to migrate.
   * @param {string}    minBbausd2Out Minimum of expected BPT out ot the migration flow.
   * @param {boolean}   staked Indicates whether tokens are initially staked or not.
   * @param {string[]}  tokenBalances Token balances in EVM scale. Array must have the same length and order as tokens in pool being migrated from. Refer to [getPoolTokens](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/interfaces/contracts/vault/IVault.sol#L334).
   * @param {string}    authorisation Encoded authorisation call.
   * @returns Migration transaction request ready to send with signer.sendTransaction
   */
  calldata(
    userAddress: string,
    bbausd1Amount: string,
    minBbausd2Out: string,
    staked: boolean,
    tokenBalances: string[],
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
        this.buildWithdraw(userAddress, bbausd1Amount),
        this.buildSwap(
          bbausd1Amount,
          minBbausd2Out,
          relayer,
          relayer,
          tokenBalances
        ),
        this.buildDeposit(userAddress),
      ];
    } else {
      calls = [
        ...calls,
        this.buildSwap(
          bbausd1Amount,
          minBbausd2Out,
          userAddress,
          userAddress,
          tokenBalances
        ),
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
   * Creates encoded batchSwap function with following swaps: boosted -> linears -> stables -> linears -> boosted
   * outputreferences should contain the amount of resulting BPT.
   *
   * @param {string}    bbausd1Amount Amount of BPT tokens to migrate.
   * @param {string}    minBbausd2Out Minimum of expected BPT out ot the migration flow.
   * @param {string}    sender Sender address.
   * @param {string}    recipient Recipient address.
   * @param {string[]}  tokenBalances Token balances in EVM scale.
   * @returns Encoded batchSwap call. Output references.
   */
  buildSwap(
    bbausd1Amount: string,
    minBbausd2Out: string,
    sender: string,
    recipient: string,
    tokenBalances: string[]
  ): string {
    const assets = [
      this.addresses.bbausd2.address,
      this.addresses.waDAI,
      this.addresses.linearDai1.address,
      this.addresses.linearDai2.address,
      this.addresses.waUSDC,
      this.addresses.linearUsdc1.address,
      this.addresses.linearUsdc2.address,
      this.addresses.waUSDT,
      this.addresses.linearUsdt1.address,
      this.addresses.linearUsdt2.address,
      this.addresses.bbausd1.address,
    ];

    const outputReferences = [{ index: 0, key: SWAP_RESULT_BBAUSD }];

    // Calculate proportional token amounts

    // Assuming 1:1 exchange rates between tokens
    // TODO: Fetch current prices, or use price or priceRate from subgraph?
    const totalLiquidity = tokenBalances.reduce(
      (sum, tokenBalance) => sum.add(BigNumber.from(tokenBalance)),
      Zero
    );

    // bbausd1[bbausd1]blinear1[linear1]stable[linear2]blinear2[bbausd2]bbausd2 and then do that proportionally for each underlying stable.
    // Split BPT amount proportionally:
    const { assetOrder } = this.addresses.bbausd1;
    const usdcBptAmt = BigNumber.from(bbausd1Amount)
      .mul(tokenBalances[assetOrder.indexOf('bb-a-USDC')])
      .div(totalLiquidity)
      .toString();
    const daiBptAmt = BigNumber.from(bbausd1Amount)
      .mul(tokenBalances[assetOrder.indexOf('bb-a-DAI')])
      .div(totalLiquidity)
      .toString();
    const usdtBptAmt = BigNumber.from(bbausd1Amount)
      .sub(usdcBptAmt)
      .sub(daiBptAmt)
      .toString();

    const swaps: BatchSwapStep[] = [
      {
        poolId: this.addresses.bbausd1.id,
        assetInIndex: 10,
        assetOutIndex: 2,
        amount: daiBptAmt,
        userData: '0x',
      },
      {
        poolId: this.addresses.linearDai1.id,
        assetInIndex: 2,
        assetOutIndex: 1,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.linearDai2.id,
        assetInIndex: 1,
        assetOutIndex: 3,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd2.id,
        assetInIndex: 3,
        assetOutIndex: 0,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd1.id,
        assetInIndex: 10,
        assetOutIndex: 5,
        amount: usdcBptAmt,
        userData: '0x',
      },
      {
        poolId: this.addresses.linearUsdc1.id,
        assetInIndex: 5,
        assetOutIndex: 4,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.linearUsdc2.id,
        assetInIndex: 4,
        assetOutIndex: 6,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd2.id,
        assetInIndex: 6,
        assetOutIndex: 0,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd1.id,
        assetInIndex: 10,
        assetOutIndex: 8,
        amount: usdtBptAmt,
        userData: '0x',
      },
      {
        poolId: this.addresses.linearUsdt1.id,
        assetInIndex: 8,
        assetOutIndex: 7,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.linearUsdt2.id,
        assetInIndex: 7,
        assetOutIndex: 9,
        amount: '0',
        userData: '0x',
      },
      {
        poolId: this.addresses.bbausd2.id,
        assetInIndex: 9,
        assetOutIndex: 0,
        amount: '0',
        userData: '0x',
      },
    ];

    // For tokens going in to the Vault, the limit shall be a positive number. For tokens going out of the Vault, the limit shall be a negative number.
    const limits = [
      BigNumber.from(minBbausd2Out).mul(-1).toString(), // bbausd2
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      '0',
      bbausd1Amount, // Max in should be bbausd1 amount
    ];

    // Swap to/from Relayer
    const funds: FundManagement = {
      sender,
      recipient,
      fromInternalBalance: false,
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
      this.addresses.bbausd1.gauge,
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
