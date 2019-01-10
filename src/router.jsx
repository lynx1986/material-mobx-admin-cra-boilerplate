import * as React from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import DashBoardIcon from '@material-ui/icons/AvTimer';
import MonitorIcon from '@material-ui/icons/Airplay';
import AnalysisIcon from '@material-ui/icons/Equalizer';
import WorkplaceIcon from '@material-ui/icons/Keyboard';
import ListIcon from '@material-ui/icons/List';
import CardListIcon from '@material-ui/icons/AspectRatio';
import FormIcon from '@material-ui/icons/Assignment';
import DetailIcon from '@material-ui/icons/ChromeReaderMode';
import UserIcon from '@material-ui/icons/Person';
import CenterIcon from '@material-ui/icons/Face';
import SettingIcon from '@material-ui/icons/Settings';

import SuccessIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import FailureIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import ExceptionIcon from '@material-ui/icons/Warning';
import Icon500 from '@material-ui/icons/Error';
import Icon404 from '@material-ui/icons/Help';
import Icon403 from '@material-ui/icons/NotificationImportant';

import { Grade as GradeIcon  } from '@material-ui/icons';

import { BasicLayout } from './layouts';
import { 
  Home, BasicForm, QueryList, StandardList, CardList,
  Analysis
} from './routes';

const ROUTES = [
  {
    path: '/dashboard', name: '总览页', layout: BasicLayout, icon: DashBoardIcon,
    children: [
      { path: '/analysis', name: '分析页', layout: BasicLayout, icon: AnalysisIcon, component: Analysis },
      { path: '/monitor', name: '监控页', layout: BasicLayout, icon: MonitorIcon, component: Home },
      { path: '/workplace', name: '工作台', layout: BasicLayout, icon: WorkplaceIcon, component: Home }
    ]
  },
  {
    path: '/forms', name: '表单页', layout: BasicLayout, icon: FormIcon,
    children: [
      { path: '/basic', name: '基础表单', layout: BasicLayout, icon: FormIcon, component: BasicForm },
      { path: '/step', name: '分布表单', layout: BasicLayout, icon: GradeIcon, component: BasicForm },
      { path: '/advanced', name: '高级表单', layout: BasicLayout, icon: GradeIcon, component: BasicForm }
    ]
  },
  {
    path: '/list', name: '列表页', layout: BasicLayout, icon: ListIcon,
    children: [
      { path: '/query', name: '查询表格', layout: BasicLayout, icon: ListIcon, component: QueryList },
      { path: '/standard', name: '标准列表', layout: BasicLayout, icon: ListIcon, component: StandardList },
      { path: '/card', name: '卡片列表', layout: BasicLayout, icon: CardListIcon, component: CardList },
      { path: '/search', name: '搜索列表', layout: BasicLayout, icon: ListIcon, component: BasicForm }
    ]
  },
  {
    path: '/detail', name: '详情页', layout: BasicLayout, icon: DetailIcon,
    children: [
      { path: '/basic', name: '基础详情', layout: BasicLayout, icon: GradeIcon, component: BasicForm },
      { path: '/advanced', name: '高级详情', layout: BasicLayout, icon: GradeIcon, component: BasicForm }
    ]
  },
  {
    path: '/result', name: '结果页', layout: BasicLayout, icon: SuccessIcon,
    children: [
      { path: '/success', name: '成功', layout: BasicLayout, icon: SuccessIcon, component: BasicForm },
      { path: '/failure', name: '失败', layout: BasicLayout, icon: FailureIcon, component: BasicForm }
    ]
  },
  {
    path: '/exception', name: '异常页', layout: BasicLayout, icon: ExceptionIcon,
    children: [
      { path: '/403', name: '403', layout: BasicLayout, icon: Icon403, component: BasicForm },
      { path: '/404', name: '404', layout: BasicLayout, icon: Icon404, component: BasicForm },
      { path: '/500', name: '500', layout: BasicLayout, icon: Icon500, component: BasicForm }
    ]
  },
  {
    path: '/user', name: '个人页', layout: BasicLayout, icon: UserIcon,
    children: [
      { path: '/center', name: '个人中心', layout: BasicLayout, icon: CenterIcon, component: BasicForm },
      { path: '/setting', name: '个人设置', layout: BasicLayout, icon: SettingIcon, component: BasicForm }
    ]
  }
];


const RouteConfig = () => {

  const routes = [];
  ROUTES.forEach(route => {
    if (route.children) {
      routes.push(...route.children.map(sRoute => 
        <Route 
          exact key={sRoute.path} path={route.path + sRoute.path}
          component={
            props => 
            <route.layout {...props} routes={ROUTES}>
              <sRoute.component {...props} />
            </route.layout>
          } 
        />
      ));
    }
    else {
      routes.push(<Route 
        exact key={route.path} path={route.path}
        component={
          props => 
          <route.layout {...props} routes={ROUTES}>
            <route.component {...props} />
          </route.layout>
        } 
      />);
    }
  });

  return (
    <Router>
      <Switch>
        <Redirect exact key='index' path='/' to='/dashboard/analysis' />
        { routes }
      </Switch>
    </Router>
  );
}

export default RouteConfig;