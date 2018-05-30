// @flow
import web3 from '../web3';

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

export const getLatestBlocks = async (amount: number): Promise<any[]> => {
  try {
    const latestBlock: number = await web3.eth.getBlockNumber();
    const latestBlockNumbers = Array.from(Array(amount).keys()).map(
      x => latestBlock - x
    );
    return Promise.all(latestBlockNumbers.map(getBlock));
  } catch (error) {
    return error;
  }
};
