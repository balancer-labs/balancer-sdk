import { defaultAbiCoder } from '@ethersproject/abi';
import { MaxInt256 } from '@ethersproject/constants';
import { StaBal3Builder } from './bbausd2-migrations/stabal3';
import { BbaUsd1Builder } from './bbausd2-migrations/bbausd1';
import { StablesBuilder } from './bbausd2-migrations/stables';

export class Migrations {
  constructor(private network: 1 | 5) {}

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
  stabal3(
    userAddress: string,
    staBal3Amount: string,
    minBbausd2Out: string,
    staked: boolean,
    authorisation?: string
  ): {
    to: string;
    data: string;
    decode: (output: string, staked: boolean) => string;
  } {
    const builder = new StaBal3Builder(this.network);
    const request = builder.calldata(
      userAddress,
      staBal3Amount,
      minBbausd2Out,
      staked,
      authorisation
    );

    return {
      to: request.to,
      data: request.data,
      decode: (output, staked) => {
        let swapIndex = staked ? 2 : 1;
        if (authorisation) swapIndex += 1;
        const multicallResult = defaultAbiCoder.decode(['bytes[]'], output);
        const swapDeltas = defaultAbiCoder.decode(
          ['int256[]'],
          multicallResult[0][swapIndex]
        );
        // bbausd2AmountOut
        return swapDeltas[0][0].abs().toString();
      },
    };
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
  bbaUsd(
    userAddress: string,
    bbausd1Amount: string,
    minBbausd2Out: string,
    staked: boolean,
    tokenBalances: string[],
    authorisation?: string
  ): {
    to: string;
    data: string;
    decode: (
      output: string,
      staked: boolean
    ) => {
      bbausd1AmountIn: string;
      bbausd2AmountOut: string;
    };
  } {
    const builder = new BbaUsd1Builder(this.network);
    const request = builder.calldata(
      userAddress,
      bbausd1Amount,
      minBbausd2Out,
      staked,
      tokenBalances,
      authorisation
    );

    return {
      to: request.to,
      data: request.data,
      decode: (output, staked) => {
        let swapIndex = staked ? 1 : 0;
        if (authorisation) swapIndex += 1;
        const multicallResult = defaultAbiCoder.decode(['bytes[]'], output);
        const swapDeltas = defaultAbiCoder.decode(
          ['int256[]'],
          multicallResult[0][swapIndex]
        );
        return {
          bbausd1AmountIn: swapDeltas[0][10].toString(),
          bbausd2AmountOut: swapDeltas[0][0].abs().toString(),
        };
      },
    };
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
  stables(
    userAddress: string,
    from: { id: string; address: string; gauge?: string },
    to: { id: string; address: string; gauge?: string },
    bptIn: string,
    minBptOut = MaxInt256.toString(),
    staked: boolean,
    tokens: string[],
    authorisation?: string
  ): {
    to: string;
    data: string;
    decode: (output: string, staked: boolean) => string;
  } {
    const builder = new StablesBuilder(this.network);
    const request = builder.calldata(
      userAddress,
      from,
      to,
      bptIn,
      minBptOut,
      staked,
      tokens,
      authorisation
    );

    return {
      to: request.to,
      data: request.data,
      decode: (output, staked) => {
        let swapIndex = staked ? 2 : 1;
        if (authorisation) swapIndex += 1;
        const multicallResult = defaultAbiCoder.decode(['bytes[]'], output);
        const swapDeltas = defaultAbiCoder.decode(
          ['int256[]'],
          multicallResult[0][swapIndex]
        );
        // bbausd2AmountOut
        return swapDeltas[0][0].abs().toString();
      },
    };
  }
}
