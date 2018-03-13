// @flow
import React from 'react';
import BlocksTable from './BlocksTable';
import DataContainer from '../../hocs/dataContainer';
import { getLatestBlocks } from '../../services/web3.service';

function BlocksPage({ data }) {
  return (
    <div>
      <BlocksTable data={data} />
    </div>
  );
}

const enhancer = DataContainer(() => getLatestBlocks(20));

export default enhancer(BlocksPage);
