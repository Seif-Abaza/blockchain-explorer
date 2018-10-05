// @flow
import { combineReducers } from 'redux';
import latestBlocks from '../pages/latestBlocks/latestBlocks.duck';

const rootReducer = combineReducers({
  latestBlocks,
});

export default rootReducer;
