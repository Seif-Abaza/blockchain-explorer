// @flow
import { getLatestBlocks } from './latestBlocks.service';
import { createReducer } from '../../utils/reduxUtils';
import { type Block } from '../block/block.service';

// not sure about this approach
const FETCH_BLOCKS_PENDING: 'FETCH_BLOCKS_PENDING' = 'FETCH_BLOCKS_PENDING';
const FETCH_BLOCKS_SUCCESS: 'FETCH_BLOCKS_SUCCESS' = 'FETCH_BLOCKS_SUCCESS';
const FETCH_BLOCKS_ERROR: 'FETCH_BLOCKS_ERROR' = 'FETCH_BLOCKS_ERROR';

export type LatestBlocksAction =
  | {
      type: typeof FETCH_BLOCKS_PENDING,
      payload?: {},
    }
  | {
      type: typeof FETCH_BLOCKS_SUCCESS,
      payload?: {},
    }
  | {
      type: typeof FETCH_BLOCKS_ERROR,
      payload?: {},
    };

type State = {
  +isLoading: boolean,
  +data: ?Array<Block>,
};

export const fetchLatestBlocksBlocksAction = (numberOfBlocks: number) => async (
  dispatch: LatestBlocksAction => any
) => {
  try {
    dispatch({ type: FETCH_BLOCKS_PENDING });
    const data = await getLatestBlocks(numberOfBlocks);
    dispatch({ type: FETCH_BLOCKS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: FETCH_BLOCKS_ERROR, payload: err });
  }
};

const initialState: State = {
  isLoading: false,
  data: null,
};

const handlePending = state => ({
  ...state,
  isLoading: true,
});

const handleSuccess = (state, action: LatestBlocksAction) => ({
  ...state,
  isLoading: false,
  data: action.payload,
});

const latestBlocks = createReducer(initialState, {
  [FETCH_BLOCKS_PENDING]: handlePending,
  [FETCH_BLOCKS_SUCCESS]: handleSuccess,
});

export default latestBlocks;
