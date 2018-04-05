// @flow
import React, { type Element } from 'react';
import { compose } from 'ramda';
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

const styles = theme => ({
  root: {
    width: '90%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    minWidth: 700,
  },
});

type Block = {
  hash: string,
  number: number,
  transactions: string[],
  size: number,
  timestamp: number,
};

type Props = {
  classes: {
    root: string,
    table: string,
  },
  data: Block[],
};

const renderBlockRow = ({
  hash,
  number,
  transactions,
  size,
  timestamp,
}: Block): Element<any> => (
  <TableRow key={hash}>
    <TableCell>{number}</TableCell>
    <TableCell>{transactions.length}</TableCell>
    <TableCell>{size}</TableCell>
    <TableCell>{timestamp}</TableCell>
  </TableRow>
);

const BlocksTable = ({ classes, data }: Props) =>
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
        <TableBody>{data.map(renderBlockRow)}</TableBody>
      </Table>
    </Paper>
  );

BlocksTable.defaultProps = {
  data: [],
};

const enhancer = compose(
  DataContainer(() => getLatestBlocks(20)),
  withStyles(styles)
);

export default enhancer(BlocksTable);
