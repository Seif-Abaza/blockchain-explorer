// @flow
import React, { type Element } from 'react';
import { compose } from 'ramda';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import dataFetcher from '../../hocs/dataFetcher';
import { getLatestBlocks } from './latestBlocks.service';
import { type Block } from '../block/block.service';

const formatTimestamp = timestamp =>
  moment.unix(timestamp).format('DD-MM-YYYY H:ss');

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
  data: (?Block)[],
  history: RouterHistory,
};

const renderBlockRow = ({ onClick }) => (block: ?Block): ?Element<any> => {
  if (!block) return undefined;
  const { hash, number, transactions, timestamp } = block;
  return (
    <TableRow key={hash} onClick={() => onClick(`/block/${number}`)}>
      <TableCell>{number}</TableCell>
      <TableCell>{transactions.length}</TableCell>
      <TableCell>{formatTimestamp(timestamp)}</TableCell>
    </TableRow>
  );
};

const LatestBlockTable = ({ classes, data, history }: Props) =>
  data && (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Block</TableCell>
            <TableCell>Transactions</TableCell>
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
  dataFetcher(() => getLatestBlocks(20)),
  withStyles(styles)
);

export default enhancer(LatestBlockTable);
