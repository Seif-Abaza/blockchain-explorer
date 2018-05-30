// @flow
import React from 'react';
import { compose } from 'ramda';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import DataContainer from '../../hocs/dataContainer';
import { getBlock } from '../../services/web3.service';

type BigNubmer = {};

export type Block = {
  hash: string,
  number: number,
  transactions: string[],
  size: number,
  timestamp: number,
  difficulty: BigNubmer,
  nonce: string,
  miner: string,
  gasLimit: number,
  gasUsed: number,
  extraData: string,
};

type Props = {
  data: Block,
  classes: {
    content: string,
    label: string,
  },
};

const styles = () => ({
  content: {
    flexGrow: 1,
  },
  label: {
    width: '100px',
  },
});

function BlockPage({ data, classes }: Props) {
  return (
    data && (
      <Card>
        <CardHeader title={`Block #${data.number}`} />
        <CardContent>
          <Grid container>
            <Grid item container>
              <Typography className={classes.label}>Hash</Typography>
              <Typography className={classes.content}>{data.hash}</Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>TimeStamp</Typography>
              <Typography className={classes.content}>
                {data.timestamp}
              </Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>Difficulty</Typography>
              <Typography className={classes.content}>
                {data.difficulty.toString().replace(/['"]+/g, '')}
              </Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>Nonce</Typography>
              <Typography className={classes.content}>{data.nonce}</Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>Size</Typography>
              <Typography className={classes.content}>{data.size}</Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>Miner</Typography>
              <Typography className={classes.content}>{data.miner}</Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>Gas Limit</Typography>
              <Typography className={classes.content}>
                {data.gasLimit}
              </Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>Gas Used</Typography>
              <Typography className={classes.content}>
                {data.gasUsed}
              </Typography>
            </Grid>
            <Grid item container>
              <Typography className={classes.label}>Extra Data</Typography>
              <Typography className={classes.content}>
                {data.extraData}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  );
}

const enhancer = compose(
  DataContainer(({ match }) => getBlock(match.params.id)),
  withStyles(styles)
);

export default enhancer(BlockPage);
