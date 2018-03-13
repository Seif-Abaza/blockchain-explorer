// @flow
import React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import routes from './routes';

const root: ?HTMLElement = document.getElementById('root');

if (root) {
  ReactDOM.render(<Root routes={routes} />, root);
}
