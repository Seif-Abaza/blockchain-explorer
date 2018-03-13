// @flow
import Web3 from 'web3';

const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://35.156.42.66:8545'));

export const getBlock = (index: number): Promise<any> =>
  new Promise((resolve, reject) => {
    web3.eth.getBlock(index, (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });

export const getLastestBlocks = (amount: number): Promise<any[]> => {
  const latestBlock: ?number = web3.eth.blockNumber;
  if (!latestBlock) return Promise.reject(new Error('latest block not found'));
  const array: number[] = Array.from(Array(amount).keys());
  const arrayOfNumbers = array.map(x => latestBlock - x);
  return Promise.all(arrayOfNumbers.map(getBlock));
};

getLastestBlocks(5);
