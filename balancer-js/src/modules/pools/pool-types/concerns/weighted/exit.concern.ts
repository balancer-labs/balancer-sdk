import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import { parseUnits } from '@ethersproject/units';
import OldBigNumber from 'bignumber.js';
import * as SDK from '@georgeroman/balancer-v2-pools';
import {
  ExitConcern,
  ExitExactBPTInParameters,
  ExitExactTokensOutParameters,
  ExitPool,
  ExitPoolAttributes,
} from '../types';
import { AssetHelpers } from '@/lib/utils';
import { Vault__factory } from '@balancer-labs/typechain';
import { WeightedPoolEncoder } from '@/pool-weighted';
import { addSlippage, subSlippage } from '@/lib/utils/slippageHelper';
import { balancerVault } from '@/lib/constants/config';
import { Pool } from '@/types';
import { BalancerError, BalancerErrorCode } from '@/balancerErrors';

export class WeightedPoolExit implements ExitConcern {
  /**
   * Build exit pool transaction parameters with exact BPT in and minimum token amounts out based on slippage tolerance
   * @param {string}  exiter - Account address exiting pool
   * @param {Pool}    pool - Subgraph pool object of pool being exited
   * @param {string}  bptIn - BPT provided for exiting pool
   * @param {string}  slippage - Maximum slippage tolerance in percentage. i.e. 0.05 = 5%
   * @param {string}  singleTokenMaxOut - Optional: token address that if provided will exit to given token
   * @returns         transaction request ready to send with signer.sendTransaction
   */
  buildExitExactBPTIn = ({
    exiter,
    pool,
    bptIn,
    slippage,
    singleTokenMaxOut,
  }: ExitExactBPTInParameters): ExitPoolAttributes => {
    if (!bptIn.length || parseFixed(bptIn, 18).isNegative()) {
      throw new BalancerError(BalancerErrorCode.INPUT_OUT_OF_BOUNDS);
    }
    if (
      singleTokenMaxOut &&
      !pool.tokens.map((t) => t.address).some((a) => a === singleTokenMaxOut)
    ) {
      throw new BalancerError(BalancerErrorCode.TOKEN_MISMATCH);
    }

    const parsedPoolInfo = this.parsePoolInfo(pool); // Parse pool info into EVM amounts in order to match amountsIn scalling
    const sortedPoolInfo = this.sortPoolInfo(
      parsedPoolInfo.tokens,
      parsedPoolInfo.balances,
      parsedPoolInfo.weights,
      parsedPoolInfo.decimals
    );

    let minAmountsOut = Array(parsedPoolInfo.tokens.length).fill('0');
    let userData: string;

    if (singleTokenMaxOut) {
      // Exit pool with single token using exact bptIn

      const singleTokenMaxOutIndex =
        parsedPoolInfo.tokens.indexOf(singleTokenMaxOut);

      const amountOut = SDK.WeightedMath._calcTokenOutGivenExactBptIn(
        new OldBigNumber(parsedPoolInfo.balances[singleTokenMaxOutIndex]),
        new OldBigNumber(parsedPoolInfo.weights[singleTokenMaxOutIndex]),
        new OldBigNumber(bptIn),
        new OldBigNumber(parsedPoolInfo.totalShares),
        new OldBigNumber(parsedPoolInfo.swapFee)
      ).toString();

      minAmountsOut[singleTokenMaxOutIndex] = subSlippage(
        BigNumber.from(amountOut),
        BigNumber.from(slippage)
      ).toString();

      userData = WeightedPoolEncoder.exitExactBPTInForOneTokenOut(
        bptIn,
        singleTokenMaxOutIndex
      );
    } else {
      // Exit pool with all tokens proportinally

      const amountsOut = SDK.WeightedMath._calcTokensOutGivenExactBptIn(
        sortedPoolInfo.balances.map((b) => new OldBigNumber(b)),
        new OldBigNumber(bptIn),
        new OldBigNumber(parsedPoolInfo.totalShares)
      ).map((amount) => amount.toString());

      minAmountsOut = amountsOut.map((amount) => {
        const minAmount = subSlippage(
          BigNumber.from(amount),
          BigNumber.from(slippage)
        );
        return minAmount.toString();
      });

      userData = WeightedPoolEncoder.exitExactBPTInForTokensOut(bptIn);
    }

    const to = balancerVault;
    const functionName = 'exitPool';
    const attributes: ExitPool = {
      poolId: pool.id,
      sender: exiter,
      recipient: exiter,
      exitPoolRequest: {
        assets: sortedPoolInfo.tokens,
        minAmountsOut,
        userData,
        toInternalBalance: false,
      },
    };
    const vaultInterface = Vault__factory.createInterface();
    // encode transaction data into an ABI byte string which can be sent to the network to be executed
    const data = vaultInterface.encodeFunctionData(functionName, [
      attributes.poolId,
      attributes.sender,
      attributes.recipient,
      attributes.exitPoolRequest,
    ]);

    return {
      to,
      functionName,
      attributes,
      data,
      minAmountsOut,
      maxBPTIn: bptIn,
    };
  };

  /**
   * Build exit pool transaction parameters with exact tokens out and maximum BPT in based on slippage tolerance
   * @param {string}    exiter - Account address exiting pool
   * @param {Pool}      pool - Subgraph pool object of pool being exited
   * @param {string[]}  tokensOut - Tokens provided for exiting pool
   * @param {string[]}  amountsOut - Amoutns provided for exiting pool
   * @param {string}    slippage - Maximum slippage tolerance in percentage. i.e. 0.05 = 5%
   * @returns           transaction request ready to send with signer.sendTransaction
   */
  buildExitExactTokensOut = ({
    exiter,
    pool,
    tokensOut,
    amountsOut,
    slippage,
  }: ExitExactTokensOutParameters): ExitPoolAttributes => {
    if (
      tokensOut.length != amountsOut.length ||
      tokensOut.length != pool.tokensList.length
    ) {
      throw new BalancerError(BalancerErrorCode.INPUT_LENGTH_MISMATCH);
    }

    const parsedPoolInfo = this.parsePoolInfo(pool);
    const sortedPoolInfo = this.sortPoolInfo(
      parsedPoolInfo.tokens,
      parsedPoolInfo.balances,
      parsedPoolInfo.weights,
      parsedPoolInfo.decimals
    );
    const sortedInputs = this.sortInputs(tokensOut, amountsOut);

    const bptIn = SDK.WeightedMath._calcBptInGivenExactTokensOut(
      sortedPoolInfo.balances.map((b) => new OldBigNumber(b)),
      sortedPoolInfo.weights.map((w) => new OldBigNumber(w)),
      sortedInputs.amounts.map((a) => new OldBigNumber(a)),
      new OldBigNumber(parsedPoolInfo.totalShares),
      new OldBigNumber(parsedPoolInfo.swapFee)
    ).toString();

    const maxBPTIn = addSlippage(
      BigNumber.from(bptIn),
      BigNumber.from(slippage)
    ).toString();

    const userData = WeightedPoolEncoder.exitBPTInForExactTokensOut(
      sortedInputs.amounts,
      maxBPTIn
    );

    const to = balancerVault;
    const functionName = 'exitPool';
    const attributes: ExitPool = {
      poolId: pool.id,
      sender: exiter,
      recipient: exiter,
      exitPoolRequest: {
        assets: sortedInputs.tokens,
        minAmountsOut: sortedInputs.amounts,
        userData,
        toInternalBalance: false,
      },
    };
    const vaultInterface = Vault__factory.createInterface();
    // encode transaction data into an ABI byte string which can be sent to the network to be executed
    const data = vaultInterface.encodeFunctionData(functionName, [
      attributes.poolId,
      attributes.sender,
      attributes.recipient,
      attributes.exitPoolRequest,
    ]);

    return {
      to,
      functionName,
      attributes,
      data,
      minAmountsOut: sortedInputs.amounts,
      maxBPTIn,
    };
  };

  // Helper methods

  /**
   * Sort pool info alphabetically by token addresses as required by gerogeroman SDK
   */
  private sortPoolInfo = (
    poolTokens: string[],
    poolBalances: string[],
    poolWeights: string[],
    poolDecimals: number[]
  ) => {
    const WETH = '0x000000000000000000000000000000000000000F'; // TODO: check if it should be possible to exit with ETH instead of WETH
    const assetHelpers = new AssetHelpers(WETH);
    const [tokens, balances, weights, decimals] = assetHelpers.sortTokens(
      poolTokens,
      poolBalances,
      poolWeights,
      poolDecimals
    ) as [string[], string[], string[], number[]];

    return {
      tokens,
      balances,
      weights,
      decimals,
    };
  };

  /**
   * Sort inputs alphabetically by token addresses as required by gerogeroman SDK
   */
  private sortInputs = (tokens: string[], amounts: string[]) => {
    const WETH = '0x000000000000000000000000000000000000000F'; // TODO: check if it should be possible to exit with ETH instead of WETH
    const assetHelpers = new AssetHelpers(WETH);
    const [_tokens, _amounts] = assetHelpers.sortTokens(tokens, amounts) as [
      string[],
      string[]
    ];
    return {
      tokens: _tokens,
      amounts: _amounts,
    };
  };

  /**
   * Parse pool info into EVM amounts
   * @param {Pool}  pool
   * @returns       parsed pool info
   */
  private parsePoolInfo = (pool: Pool) => {
    const decimals = pool.tokens.map((token) => {
      if (!token.decimals)
        throw new BalancerError(BalancerErrorCode.MISSING_DECIMALS);
      return token.decimals;
    });
    const weights = pool.tokens.map((token) => {
      if (!token.weight)
        throw new BalancerError(BalancerErrorCode.MISSING_WEIGHT);
      return parseUnits(token.weight).toString();
    });
    const tokens = pool.tokens.map((token) => token.address);
    const balances = pool.tokens.map((token) =>
      parseFixed(token.balance, token.decimals).toString()
    );
    const totalShares = parseUnits(pool.totalShares).toString();
    const swapFee = parseUnits(pool.swapFee).toString();
    return {
      tokens,
      balances,
      weights,
      decimals,
      totalShares,
      swapFee,
    };
  };
}
