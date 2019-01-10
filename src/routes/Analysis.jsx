import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Line, Bar } from 'react-chartjs-2';

import {
  Grid, Card, CardContent, Avatar, Paper, Typography, Divider, LinearProgress, Tabs, Tab, AppBar, 
  List, ListItem, ListItemText, ListItemSecondaryAction
} from '@material-ui/core';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown';

import styles from './Analysis.style';

const CHART1_DATA = {
  labels: ['', '', '', '', '', '', '', '', ''],
  datasets: [{ data: [58, 39, 18, 47, 6, 35, 24, 63, 42, 31] }]
};

const CHART1_OPTIONS = {
  maintainAspectRatio: false,
  layout: { padding: { top: 0 } },
  scales: {
    yAxes: [{ gridLines: { display: false }, display: false }],
    xAxes: [{ gridLines: { display: false }}],
  }  
}

const CHART2 = {
  DATA: {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    datasets: [{ data: [400, 560, 803, 1000, 865, 345, 390, 610, 279, 867, 799, 430] }]
  },
  OPTIONS: {
    maintainAspectRatio: false,
    scales: {
      yAxes: [{ gridLines: { display: false } }],
      xAxes: [{ gridLines: { display: false } }],
    }  
  }
}

const SHOP_DATA = (new Array(6).fill(0)).map((v, i) => ({ id: i, name: '门店' + i, count: 1000 + i }));

class Analysis extends React.Component {

  state = {
    tabIndex: 0
  };

  render() {

    const { classes } = this.props;
    const { tabIndex } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.section}>
          <Grid container spacing={16}>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>总销售额</Typography>
                  <Typography variant='h5' component='h2' gutterBottom>￥126,500</Typography>
                  <Typography className={classes.chartArea}>
                    周同比&nbsp;&nbsp;12%<ArrowUpIcon/>&nbsp;日同比&nbsp;&nbsp;11%<ArrowDownIcon />
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography>日销售额&nbsp;￥12,423</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>访问量</Typography>
                  <Typography variant='h5' component='h2' gutterBottom>8,846</Typography>
                  <div className={classes.chartArea}>
                    <Line data={CHART1_DATA} legend={{ display: false }} options={CHART1_OPTIONS} />
                  </div>
                  <Divider className={classes.divider} />
                  <Typography>日访问量&nbsp;1,234</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>支付笔数</Typography>
                  <Typography variant='h5' component='h2' gutterBottom>6,560</Typography>
                  <div className={classes.chartArea}>
                    <Bar data={CHART1_DATA} legend={{ display: false }} options={CHART1_OPTIONS} />
                  </div>
                  <Divider className={classes.divider} />
                  <Typography>转化率&nbsp;60%</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <Typography color='textSecondary' gutterBottom>运营活动效果</Typography>
                  <Typography variant='h5' component='h2' gutterBottom>78%</Typography>
                  <div className={classes.chartArea}>
                    <LinearProgress style={{width: '100%', height: 8}} variant='determinate' value={78} />
                  </div>
                  <Divider className={classes.divider} />
                  <Typography>周同比&nbsp;12%&nbsp;日同比&nbsp;11%</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
        <div className={classes.section} style={{backgroundColor: '#FFF'}}>
          <AppBar position='static' color='default'>
            <Tabs 
              indicatorColor='primary' textColor='primary' variant='scrollable' value={tabIndex} 
              onChange={(e, v) => this.setState({ tabIndex: v })}
            >
              <Tab label='销售额' />
              <Tab label='访问量' />
            </Tabs>
          </AppBar>
          { tabIndex === 0 && this.renderTabContent('销售量') }
          { tabIndex === 1 && this.renderTabContent('访问量') }
        </div>
      </div>
    )
  }

  renderTabContent(title, list) {

    const { classes } = this.props;

    return (
      <Grid className={classes.tabContent} container spacing={16}>
        <Grid item xs={8} >
          <h5>{title + '趋势'}</h5>
          <div className={classes.tabChart}>
            <Bar data={CHART2.DATA} legend={{ display: false }} options={CHART2.OPTIONS} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <h5>{'门店' + title + '排名'}</h5>
          <List>
            {
              SHOP_DATA.map((shop, index) => 
                <ListItem key={shop.id} dense>
                  <span className={classNames(classes.rank, { [classes.rankTop3]: index < 3 })}>
                    {index + 1}
                  </span>
                  <ListItemText primary={shop.name} />
                  <ListItemSecondaryAction>{shop.count}</ListItemSecondaryAction>
                </ListItem>
              )
            }
          </List>
        </Grid>
      </Grid>
    )
  }
}

Analysis.propTypes = {
  classes: PropTypes.object.isRequired
};

Analysis.defaultProps = {
  classes: {}
};

export default withStyles(styles, { withTheme: true })(Analysis);