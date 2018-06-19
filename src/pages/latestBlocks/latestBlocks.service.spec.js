import web3 from '../../web3';
import * as latestBlocksService from './latestBlocks.service';

jest.mock('../../web3');

describe('test', () => {
  beforeAll(() => {
    web3.eth.getBlock = jest.fn(number =>
      Promise.resolve({ blockNumber: number })
    );
    web3.eth.getBlockNumber = jest.fn(() => Promise.resolve(5));
  });

  test('returns latest n blocks', async () => {
    const block = await latestBlocksService.getLatestBlocks(2);
    expect(block).toEqual([
      {
        blockNumber: 5,
      },
      {
        blockNumber: 4,
      },
    ]);
  });
});
