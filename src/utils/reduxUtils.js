// @flow
// eslint-disable-next-line max-len
import { type LatestBlocksAction } from '../pages/latestBlocks/latestBlocks.duck';

type Action = LatestBlocksAction;

type Reducer<T> = (state: T, action: Action) => T;

export function createReducer<State>(
  initialState: State,
  handlers: {
    [string]: Reducer<State>,
  }
) {
  const modifiedHandlers = {};
  Object.keys(handlers).forEach(handler => {
    modifiedHandlers[handler] = handlers[handler];
  });
  return function reducer(state: State = initialState, action: Action) {
    if (Object.prototype.hasOwnProperty.call(modifiedHandlers, action.type)) {
      return modifiedHandlers[action.type](state, action);
    }
    return state;
  };
}
