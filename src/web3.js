// @flow
import Web3 from 'web3';

const web3 = new Web3();

web3.setProvider(
  new web3.providers.HttpProvider(
    'https://mainnet.infura.io/zhEnUHjGWtv1rueDkquG'
  )
);

export default web3;
