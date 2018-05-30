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

export const getBlock = (index: number): Promise<any> =>
  new Promise((resolve, reject) => {
    web3.eth.getBlock(index, (error: Error, result: Block | null) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });

export const getLatestBlocks = (amount: number): Promise<any[]> => {
  const latestBlock: ?number = web3.eth.blockNumber;
  if (!latestBlock) return Promise.reject(new Error('latest block not found'));
  const latestBlockNumbers = Array.from(Array(amount).keys()).map(
    x => latestBlock - x
  );
  return Promise.all(latestBlockNumbers.map(getBlock));
};
