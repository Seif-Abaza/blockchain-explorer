import web3 from '../../web3';
import * as blockService from './block.service';

jest.mock('../../web3');

describe('test', () => {
  beforeAll(() => {
    web3.eth.getBlock = jest.fn(number =>
      Promise.resolve({ blockNumber: number })
    );
    web3.eth.getBlockNumber = jest.fn(() => Promise.resolve(5));
  });

  test('promisifies get block', async () => {
    const block = await blockService.getBlock(1);
    expect(block).toEqual({ blockNumber: 1 });
  });
});
