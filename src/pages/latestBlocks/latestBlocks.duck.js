import { fetchLatestBlocksBlocks } from './latestBlocks.service';

const FETCH_BLOCKS = 'FETCH_BLOCKS';

const fetchLatestBlocksBlocksAction = number => async dispatch => {
  try {
    await fetchLatestBlocksBlocks(200);
  } catch (err) {}
};
