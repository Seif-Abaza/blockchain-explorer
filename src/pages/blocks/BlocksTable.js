// @flow
import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

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
  classes: any,
  data: any[],
};

const BlocksTable = ({ classes, data }: Props) => (
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
        {data.map(n => (
          <TableRow key={n.hash}>
            <TableCell>{n.number}</TableCell>
            <TableCell>{n.transactions.length}</TableCell>
            <TableCell>{n.size}</TableCell>
            <TableCell>{n.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default withStyles(styles)(BlocksTable);
