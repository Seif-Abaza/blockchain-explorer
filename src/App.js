/* @flow */
import * as React from 'react';

type Props = {
  bar?: string,
};

class App extends React.Component<Props> {
  render() {
    return <div>{this.props.bar}</div>;
  }
}

export default App;
