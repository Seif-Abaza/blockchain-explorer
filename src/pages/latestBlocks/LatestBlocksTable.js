// @flow
import React, { type Element } from 'react';
import { compose } from 'ramda';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import DataContainer from '../../hocs/dataContainer';
import { getLatestBlocks } from '../../services/web3.service';
import { type Block } from '../block/BlockPage';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    minWidth: 700,
  },
});

type Props = {
  classes: {
    root: string,
    table: string,
  },
  data: Block[],
  history: RouterHistory,
};

const renderBlockRow = ({ onClick }) => ({
  hash,
  number,
  transactions,
  size,
  timestamp,
}: Block): Element<any> => (
  <TableRow key={hash} onClick={() => onClick(`/block/${number}`)}>
    <TableCell>{number}</TableCell>
    <TableCell>{transactions.length}</TableCell>
    <TableCell>{size}</TableCell>
    <TableCell>{timestamp}</TableCell>
  </TableRow>
);

const LatestBlockTable = ({ classes, data, history }: Props) =>
  data && (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Block</TableCell>
            <TableCell>Transactions</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>TimeStamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(renderBlockRow({ onClick: history.push }))}
        </TableBody>
      </Table>
    </Paper>
  );

LatestBlockTable.defaultProps = {
  data: [],
};

const enhancer = compose(
  withRouter,
  DataContainer(() => getLatestBlocks(20)),
  withStyles(styles)
);

export default enhancer(LatestBlockTable);
