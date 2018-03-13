// @flow
import * as React from 'react';
import TransactionPage from './pages/Transactions/TransactionsPage';

type Props = {
  /* ... */
};

type State = {
  count: number,
};

class App extends React.Component<Props, State> {
  componentDidMount() {}

  render() {
    return <TransactionPage />;
  }
}

export default App;
