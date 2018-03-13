import web3 from '../web3';
import * as web3Service from './web3.service';

jest.mock('../web3');

describe('test', () => {
  beforeAll(() => {
    web3.eth.getBlock = jest.fn((number, cb) =>
      cb(null, { blockNumber: number })
    );
  });

  test('promisifies get block', async () => {
    const block = await web3Service.getBlock(1);
    expect(block).toEqual({ blockNumber: 1 });
  });

  test('returns latest n blocks', async () => {
    web3.eth.blockNumber = 5;
    const block = await web3Service.getLatestBlocks(2);
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
