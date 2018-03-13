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
          <TableCell>Block #</TableCell>
          <TableCell numeric>Number of Transactions</TableCell>
          <TableCell numeric>Size</TableCell>
          <TableCell numeric>TimeStamp</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(n => (
          <TableRow key={n.hash}>
            <TableCell>{n.number}</TableCell>
            <TableCell numeric>{n.transactions.length}</TableCell>
            <TableCell numeric>{n.size}</TableCell>
            <TableCell numeric>{n.timestamp}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default withStyles(styles)(BlocksTable);
