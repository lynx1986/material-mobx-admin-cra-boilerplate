import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import {
  List, ListItem, ListItemText, Avatar, LinearProgress, IconButton, Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';

import styles from './StandardList.style'; 

const ITEMS = [
  { id: 1, title: 'Google', desc: 'Google fdafdafdsafdsfa', percentage: 0},
  { id: 2, title: 'Microsoft', desc: 'Microsoft fdafdafdsafdsfa', percentage: 20},
  { id: 3, title: 'Apple', desc: 'Apple fdafdafdsafdsfa', percentage: 40},
  { id: 4, title: 'Tencent', desc: 'Tencent fdafdafdsafdsfa', percentage: 70},
  { id: 5, title: 'Alibaba', desc: 'Alibaba fdafdafdsafdsfa', percentage: 100},
];

class StandardList extends React.Component {

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Button fullWidth variant='outlined' color='secondary'>
          <AddIcon fontSize='small' />添加
        </Button>
        <List>
          {
            ITEMS.map(item =>
              <ListItem divider key={item.title}>
                <Avatar></Avatar>
                <ListItemText primary={item.title} secondary={item.desc} />
                <LinearProgress variant='determinate' value={item.percentage} className={classNames(classes.progress, classes.contentItem)} color='secondary' />
                <div className={classNames(classes.progressTitle, classes.contentItem)}>{item.percentage + '%'}</div>
                <div className={classes.contentItem}>
                  <IconButton><EditIcon fontSize='small' /></IconButton>
                  <IconButton><MoreIcon fontSize='small' /></IconButton>
                </div>
              </ListItem>  
            )
          }
        </List>
      </div>
    )
  }
}

StandardList.propTypes = {
  classes: PropTypes.object.isRequired
};

StandardList.defaultProps = {
  classes: {}
};

export default withStyles(styles, { withTheme: true })(StandardList);