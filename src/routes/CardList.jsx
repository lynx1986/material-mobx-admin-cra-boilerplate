import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {
  Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Grid,
  Divider
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import LikeIcon from '@material-ui/icons/Favorite';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './CardList.style'; 

const ITEMS = [
  { id: 1, title: 'Google', desc: 'Google fdafdafdsafdsfa'},
  { id: 2, title: 'Microsoft', desc: 'Microsoft fdafdafdsafdsfa'},
  { id: 3, title: 'Apple', desc: 'Apple fdafdafdsafdsfa'},
  { id: 4, title: 'Tencent', desc: 'Tencent fdafdafdsafdsfa'},
  { id: 5, title: 'Alibaba', desc: 'Alibaba fdafdafdsafdsfa'},
];

class CardList extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {
            ITEMS.map(item =>
              <Grid item xs={4} key={item.title}>
                <Card>
                  <CardHeader
                    avatar={<Avatar aria-label='name' >A</Avatar>}
                    action={<IconButton><MoreIcon /></IconButton>}
                    title={item.title}
                  />
                  <CardContent>
                    <Typography component='p'>{item.desc}</Typography>
                  </CardContent>
                  <Divider />
                  <CardActions disableActionSpacing>
                    <IconButton aria-label='Like'><LikeIcon /></IconButton>
                    <IconButton aria-label='Share'><ShareIcon /></IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          }
        </Grid>
      </div>
    )
  }
}

CardList.propTypes = {
  classes: PropTypes.object.isRequired
};

CardList.defaultProps = {
  classes: {}
};

export default withStyles(styles, { withTheme: true })(CardList);