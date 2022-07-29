import {
  ExitConcern,
  ExitExactBPTInParameters,
  ExitExactTokensOutParameters,
  ExitPoolAttributes,
} from '../types';

export class StablePoolExit implements ExitConcern {
  buildExitExactBPTIn = ({
    exiter,
    pool,
    bptIn,
    slippage,
    singleTokenMaxOut,
  }: ExitExactBPTInParameters): ExitPoolAttributes => {
    // TODO implementation
    console.log(exiter, pool, bptIn, slippage, singleTokenMaxOut);
    throw new Error('To be implemented');
  };

  buildExitExactTokensOut = ({
    exiter,
    pool,
    tokensOut,
    amountsOut,
    slippage,
  }: ExitExactTokensOutParameters): ExitPoolAttributes => {
    // TODO implementation
    console.log(exiter, pool, tokensOut, amountsOut, slippage);
    throw new Error('To be implemented');
  };
}
