// @flow
import React, { Component } from 'react';
import Web3 from 'web3';

const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://35.156.42.66:8545'));

class TransactionsPage extends Component<{}> {
  async componentDidMount() {
    const block = await web3.eth.getBlock(web3.eth.blockNumber);
    console.log(block);
  }

  render() {
    return <div />;
  }
}

TransactionsPage.propTypes = {};

export default TransactionsPage;
