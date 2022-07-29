import { StablePoolEncoder } from '@/pool-stable/encoder';
import { ADDRESSES } from './addresses';
import { Relayer } from '@/modules/relayer/relayer.module';
import { ExitPoolRequest } from '@/types';
import { BatchSwapStep, FundManagement, SwapType } from '@/modules/swaps/types';
import { Interface } from '@ethersproject/abi';
import { MaxUint256, MaxInt256 } from '@ethersproject/constants';
// TODO - Ask Nico to update Typechain?
import balancerRelayerAbi from '@/lib/abi/BalancerRelayer.json';
import { BigNumber } from 'ethers';
const balancerRelayerInterface = new Interface(balancerRelayerAbi);

const SWAP_RESULT = Relayer.toChainedReference('0');
const EXIT_RESULTS: BigNumber[] = [];

export class StablesBuilder {
  private addresses;

  constructor(networkId: 1 | 5) {
    this.addresses = ADDRESSES[networkId];
  }

  /**
   * Builds migration call data.
   * Migrates tokens from old stable to new stable phantom pools with the same underlying tokens.
   * Tokens that are initially staked are re-staked at the end of migration. Non-staked are not.
   *
   * @param {string}                    userAddress User address.
   * @param {{string, string, string}}  from Pool info being migrated from
   * @param {{string, string, string}}  to Pool info being migrated to
   * @param {string}                    bptIn Amount of BPT tokens to migrate.
   * @param {string}                    minBptOut Minimum of expected BPT out ot the migration flow.
   * @param {boolean}                   staked Indicates whether tokens are initially staked or not.
   * @param {string[]}                  tokens Token addresses. Array must have the same length and order as tokens in pool being migrated from. Refer to [getPoolTokens](https://github.com/balancer-labs/balancer-v2-monorepo/blob/master/pkg/interfaces/contracts/vault/IVault.sol#L334).
   * @param {string}                    authorisation Encoded authorisation call.
   * @returns Migration transaction request ready to send with signer.sendTransaction
   */
  calldata(
    userAddress: string,
    from: { id: string; address: string; gauge?: string },
    to: { id: string; address: string; gauge?: string },
    bptIn: string,
    minBptOut: string = MaxInt256.toString(),
    staked: boolean,
    tokens: string[],
    authorisation?: string
  ): {
    to: string;
    data: string;
  } {
    const relayer = this.addresses.relayer;
    let calls: string[] = authorisation
      ? [this.buildSetRelayerApproval(authorisation)]
      : [];

    if (staked && (from.gauge == undefined || to.gauge == undefined))
      throw new Error(
        'Staked flow migration requires gauge addresses to be provided'
      );

    if (staked) {
      calls = [
        ...calls,
        this.buildWithdraw(userAddress, bptIn, from.gauge as string),
        this.buildExit(from.id, relayer, relayer, bptIn, tokens),
        this.buildSwap(minBptOut, relayer, to.id, to.address, tokens),
        this.buildDeposit(userAddress, to.gauge as string),
      ];
    } else {
      calls = [
        ...calls,
        this.buildExit(from.id, userAddress, relayer, bptIn, tokens),
        this.buildSwap(minBptOut, userAddress, to.id, to.address, tokens),
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
   * Encodes exitPool call data.
   * Exit stable pool proportionally to underlying stables. Exits to relayer.
   * Outputreferences are used to store exit amounts for next transaction.
   *
   * @param {string}    poolId Pool id.
   * @param {string}    sender Sender address.
   * @param {string}    recipient Recipient address.
   * @param {string}    amount Amount of BPT to exit with.
   * @param {string[]}  tokens Token addresses to exit to.
   * @returns Encoded exitPool call. Output references.
   */
  buildExit(
    poolId: string,
    sender: string,
    recipient: string,
    amount: string,
    tokens: string[]
  ): string {
    // Assume gaugeWithdraw returns same amount value
    const userData = StablePoolEncoder.exitExactBPTInForTokensOut(amount);

    // Ask to store exit outputs for batchSwap of exit is used as input to swaps
    // TODO: check how does tokens order matter between exits and swaps
    const outputReferences = [];
    for (let i = 0; i < tokens.length; i++) {
      outputReferences[i] = {
        index: i,
        key: Relayer.toChainedReference(`${i + 1}`), // index 0 will be used by swap result
      };
      EXIT_RESULTS.push(outputReferences[i].key);
    }

    const minAmountsOut = Array<string>(tokens.length).fill('0');

    const callData = Relayer.constructExitCall({
      assets: tokens,
      minAmountsOut,
      userData,
      toInternalBalance: true,
      poolId,
      poolKind: 0, // This will always be 0 to match supported Relayer types
      sender,
      recipient,
      outputReferences,
      exitPoolRequest: {} as ExitPoolRequest,
    });

    return callData;
  }

  /**
   * Creates encoded batchSwap function to swap stables to new phantom stable pool BPT.
   * outputreferences should contain the amount of resulting BPT.
   *
   * @param {string}    expectedBptReturn BPT amount expected out of the swap.
   * @param {string}    recipient Recipient address.
   * @param {string}    poolId Pool id
   * @param {string}    poolAddress Pool address
   * @param {string[]}  tokens Token addresses to swap from.
   * @returns BatchSwap call.
   */
  buildSwap(
    expectedBptReturn: string,
    recipient: string,
    poolId: string,
    poolAddress: string,
    tokens: string[]
  ): string {
    const assets = [poolAddress, ...tokens];

    const outputReferences = [{ index: 0, key: SWAP_RESULT }];

    const swaps: BatchSwapStep[] = [];
    // Add a swap flow for each token provided
    for (let i = 0; i < tokens.length; i++) {
      swaps.push({
        poolId,
        assetInIndex: i + 1,
        assetOutIndex: 0,
        amount: EXIT_RESULTS[i].toString(),
        userData: '0x',
      });
    }

    // For tokens going in to the Vault, the limit shall be a positive number. For tokens going out of the Vault, the limit shall be a negative number.
    const limits = [BigNumber.from(expectedBptReturn).mul(-1).toString()];
    for (let i = 0; i < tokens.length; i++) {
      limits.push(MaxInt256.toString());
    }

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
   * @param {string} gaugeAddress Gauge address.
   * @returns withdraw call
   */
  buildWithdraw(sender: string, amount: string, gaugeAddress: string): string {
    return Relayer.encodeGaugeWithdraw(
      gaugeAddress,
      sender,
      this.addresses.relayer,
      amount
    );
  }

  /**
   * Uses relayer to deposit user's BPT to gauge and sends to recipient
   *
   * @param {string} recipient Recipient address.
   * @param {string} gaugeAddress Gauge address.
   * @returns deposit call
   */
  buildDeposit(recipient: string, gaugeAddress: string): string {
    return Relayer.encodeGaugeDeposit(
      gaugeAddress,
      this.addresses.relayer,
      recipient,
      SWAP_RESULT.toString()
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
