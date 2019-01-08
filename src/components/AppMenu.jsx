import * as React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import {
  List, ListItem, ListItemIcon, ListItemText, Collapse
} from '@material-ui/core';

import styles from './AppMenu.style'; 


class AppMenu extends React.Component {

  constructor(props) {
    super(props);

    const { menus, activeKey, expandAll } = props;

    this.state = { 
      openKeys: this.getOpenKeys(menus, expandAll, activeKey) 
    };
  }

  getOpenKeys(menus, expandAll, activeKey) {

    const openKeys = [];
    if (expandAll) {
      openKeys.push(...menus.map(m => m.path));
    }
    else if (openKeys.length === 0 && activeKey !=='') {
      openKeys.push(menus.find(m => activeKey.indexOf(m.path) === 0).path);
    }

    return openKeys;
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.activeKey !== this.props.activeKey) {
      const { menus, expandAll, activeKey } = nextProps;
      this.setState({
        openKeys: this.getOpenKeys(menus, expandAll, activeKey)
      });
    }
  }

  handleClick = () => {
    this.setState(state => ({ open: !this.state.open }));
  };

  render() {

    const { classes, menus, activeKey } = this.props;

    return (
      <List component="nav" className={classes.root} >
        { 
          menus.map(menu => 
            menu.children && menu.children.length > 0 ?
              this.renderSubMenu(menu) :
              <ListItem 
                key={menu.path}
                button selected={activeKey === menu.path}
                onClick={() => this.handleClickItem([menu.path])}>
                { 
                  menu.icon ? 
                    <ListItemIcon><menu.icon color={activeKey === menu.path ? 'primary' : 'inherit'} /></ListItemIcon> :
                    <div /> 
                }
                <ListItemText inset primary={menu.name} />
              </ListItem>
          )  
        }
      </List>
    )
  }

  renderSubMenu(menu) {

    const { classes, activeKey } = this.props;
    const { openKeys } = this.state;

    const menuOpened = openKeys.includes(menu.path);
    console.log(openKeys, menu.path, activeKey);

    return (
      <React.Fragment key={menu.path}>
        <ListItem button onClick={() => this.handleClickMenu(menu.path)}>
          { menu.icon ? <ListItemIcon><menu.icon color={activeKey.indexOf(menu.path) === 0 ? 'primary' : 'inherit'} /></ListItemIcon> : <div /> }
          <ListItemText inset primary={menu.name} />
        </ListItem>
        <Collapse in={menuOpened} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {
              menu.children.map(subMenu => 
                <ListItem
                  selected={activeKey === menu.path + subMenu.path}
                  key={menu.path + subMenu.path}
                  button className={classes.nested} 
                  onClick={() => this.handleClickItem([menu.path, subMenu.path])}
                >
                  { 
                    subMenu.icon ? 
                      <ListItemIcon><subMenu.icon color={(activeKey === menu.path + subMenu.path) ? 'secondary' : 'inherit' } /></ListItemIcon> : 
                      <div /> 
                  }
                  <ListItemText inset primary={subMenu.name} />
                </ListItem>     
              )
            }
          </List>
        </Collapse>
      </React.Fragment>
    )
  }

  handleClickItem = keys => {

    if (keys.length === 0) return;

    if (this.props.onMenuItemClick) {
      this.props.onMenuItemClick(keys.join(''));
    }
  }

  handleClickMenu = key => {

    const { openKeys } = this.state;
    const { expandAll } = this.props;

    if (!expandAll) {
      this.setState({ openKeys: openKeys.includes(key) ? [] : [key] });
    }
    else {
      const index = openKeys.indexOf(key);
      console.log(openKeys, key, index);
      if (index < 0) {
        this.setState({ openKeys: [...openKeys, key]})
      }
      else {
        openKeys.splice(index, 1);
        this.setState({ openKeys: openKeys });
      }
    }
  }
}

AppMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  openKeys: PropTypes.array.isRequired,
  menus: PropTypes.array.isRequired,
  expandAll: PropTypes.bool.isRequired,
  activeKey: PropTypes.string.isRequired
};

AppMenu.defaultProps = {
  classes: {},
  openKeys: [],
  menus: [],
  expandAll: false,
  activeKey: ''
};

export default withStyles(styles, { withTheme: true })(AppMenu);