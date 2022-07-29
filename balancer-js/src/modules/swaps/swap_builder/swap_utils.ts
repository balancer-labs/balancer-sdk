import { Vault__factory } from '@balancer-labs/typechain';
import BatchRelayerLibraryAbi from '@/lib/abi/BatchRelayerLibrary.json';
import { JsonFragment } from '@ethersproject/abi';
import { networkAddresses } from '@/lib/constants/config';

/**
 * Maps SOR data to get the tokenIn used in swaps.
 * Logic related to a relayer wrapping and unwrapping tokens.
 * SOR returns list of already wrapped tokenAddresses used in the swap.
 * However tokenIn defined as an input is the unwrapped token.
 * Note: tokenAddresses are transformed in SOR lib wrapInfo.setWrappedInfo
 * TODO: Once PR is merged, this table can be removed.
 */
type WrappedList = {
  [key: string]: string;
};

const underlyingToWrappedMap: WrappedList = {
  // stETH => wstETH
  '0xae7ab96520de3a18e5e111b5eaab095312d7fe84':
    '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',

  // AMPL => WAMPL
  '0xd46ba6d942050d489dbd938a2c909a5d5039a161':
    '0xedb171c18ce90b633db442f2a6f72874093b49ef',

  // aAMPL -> ubAAMPL
  '0x1e6bb68acec8fefbd87d192be09bb274170a0548':
    '0xF03387d8d0FF326ab586A58E0ab4121d106147DF',
};

/**
 * Vault swaps are operating on wrapped tokens. When user is sending an unwrapped token, it's wrapped in a relayer.
 * SOR is returning an array of tokens already wrapped.
 * Converts tokenIn to match tokenIn used in a swap.
 *
 * TODO: add tokenIn and tokenOut addressed used for swap in the SOR results as tokenInForSwap, tokenOutForSwap
 *
 * @param token token address
 * @returns wrapped token address
 */
function tokenForSwaps(token: string): string {
  let wrapped = token;
  // eslint-disable-next-line no-prototype-builtins
  if (underlyingToWrappedMap.hasOwnProperty(token)) {
    wrapped = underlyingToWrappedMap[token as keyof WrappedList];
  }
  return wrapped;
}

export enum Relayers {
  vault = 1,
  lido = 2,
}

export interface SwapRelayer {
  id: Relayers;
  address: string;
}

/**
 * Resolves a contract address for sending swap transaction to.
 * Balancer is using relayers to automatically wrap / unwrap tokens not compatibile with ERC20.
 */
function relayerResolver(
  assetIn: string,
  assetOut: string,
  chainId: number
): SwapRelayer {
  const { tokens, contracts } = networkAddresses(chainId);

  let to = {
    id: Relayers.vault,
    address: contracts.vault,
  };

  if (tokens.stETH && contracts.lidoRelayer)
    if ([assetIn, assetOut].includes(tokens.stETH))
      to = {
        id: Relayers.lido,
        address: contracts.lidoRelayer,
      };

  return to;
}

function swapFragment(relayer: SwapRelayer): JsonFragment[] {
  let source = Vault__factory.abi;
  if (relayer.id === Relayers.lido) source = BatchRelayerLibraryAbi;

  const signatures = source.filter(
    (fn) => fn.name && ['swap', 'batchSwap'].includes(fn.name)
  );

  return signatures;
}

function batchSwapFragment(
  assetIn: string,
  assetOut: string,
  chainId: number
): JsonFragment[] {
  const vaultSignaturesForSwaps = Vault__factory.abi.filter(
    (fn) => fn.name && ['batchSwap'].includes(fn.name)
  );
  const relayerSignaturesForSwaps = BatchRelayerLibraryAbi.filter(
    (fn) => fn.name && ['batchSwap'].includes(fn.name)
  );
  let returnSignatures = vaultSignaturesForSwaps;
  const { tokens, contracts } = networkAddresses(chainId);
  if (tokens.stETH && contracts.lidoRelayer) {
    if ([assetIn, assetOut].includes(tokens.stETH))
      returnSignatures = relayerSignaturesForSwaps;
  }

  return returnSignatures;
}

export { tokenForSwaps, relayerResolver, swapFragment, batchSwapFragment };
