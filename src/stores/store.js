import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunk from 'redux-thunk';
import reducer from '../reducers';

export const history = createHistory();

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const middleware = [thunk, routerMiddleware(history)];

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const configureStore = () => {
  const store = createStore(connectRouter(history)(reducer), enhancer);

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(reducer);
      });
    }
  }

  return store;
};

export default configureStore();
