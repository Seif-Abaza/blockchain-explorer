// @flow
import web3 from '../../web3';

type BigNubmer = {};

export type Block = {
  hash: string,
  number: number,
  transactions: string[],
  size: number,
  timestamp: number,
  difficulty: BigNubmer,
  nonce: string,
  miner: string,
  gasLimit: number,
  gasUsed: number,
  extraData: string,
};

// probably better would be to create a flowtyped lib
export const getBlock = (index: number): Promise<any> =>
  web3.eth.getBlock(index);
