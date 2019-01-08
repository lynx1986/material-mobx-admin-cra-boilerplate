import * as React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react'

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Drawer, Divider } from '@material-ui/core';
import * as Icons from '@material-ui/icons';

import AppMenu from '../components/AppMenu';

import styles from './BasicLayout.style';

class BasicLayout extends React.Component {

  componentDidMount() {
    this.props.app.setMenuActiveKey(this.props.location.pathname);
  }

  render() {

    const { classes, theme, routes, app } = this.props;
    console.log(theme);

    return (
      <div className={classes.root}>
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: !app.menuCollapsed
          })}
        >
          <Toolbar disableGutters={app.menuCollapsed}>
            <IconButton
              color='inherit' 
              className={classNames(classes.menuButton, {
                [classes.hide]: !app.menuCollapsed
              })}
              onClick={() => app.setMenuCollapsed(false)}
            >
              <Icons.Menu />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: !app.menuCollapsed,
            [classes.drawerClose]: app.menuCollapsed,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: !app.menuCollapsed,
              [classes.drawerClose]: app.menuCollapsed,
            }),
          }}
          open={!app.menuCollapsed}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={() => app.setMenuCollapsed(true)}>
              {theme.direction === 'rtl' ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <AppMenu 
            menus={routes} activeKey={app.menuActiveKey}
            onMenuItemClick={this.handleMenuItemClick}  
          />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    )
  }

  handleMenuItemClick = menuKey => {
    this.props.app.setMenuActiveKey(menuKey);
    this.props.history.push(menuKey);
  }
}

BasicLayout.propTypes = {
  routes: PropTypes.array.isRequired,
};

BasicLayout.defaultProps = {
  routes: []
};

const InjectedComponent = inject(stores => ({
  app: stores.app
}))(observer(BasicLayout));

export default withStyles(styles, { withTheme: true })(InjectedComponent);