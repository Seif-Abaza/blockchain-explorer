// @flow
import web3 from '../../web3';
import { getBlock } from '../block/block.service';

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
