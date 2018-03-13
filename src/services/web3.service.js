// @flow
import web3 from '../web3';

export const getBlock = (index: number): Promise<any> =>
  new Promise((resolve, reject) => {
    web3.eth.getBlock(index, (error, result) => {
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
