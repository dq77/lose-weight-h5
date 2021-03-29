/*
 * @Author: 刁琪
 * @Date: 2019-09-10 16:31:17
 * @LastEditors: わからないよう
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import './lib/font/iconfont.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Qiandao from './page/qiandao/index';
import WeekList from './page/weekList/index';
import MonthList from './page/monthList/index';
import NewGroup from './page/newGroup/index';
import Login from './page/login/index';
import Register from './page/login/register';
import MonthHistory from './page/monthHistory/index';
import Kefu from './page/kefu/index';

ReactDOM.render(
  <HashRouter>
    <Route exact path='/' render={() => <Redirect to='/user' push />} />
    <Route path='/index' component={ App } />
    <Route path='/user' component={ App } />
    <Route path='/login' component={ Login } />
    <Route path='/register' component={ Register } />
    <Route path='/monthHistory' component={ MonthHistory } />
    <Route path='/kefu' component={ Kefu } />
    <Route path='/qiandao' component={ Qiandao } />
    <Route path='/weekList/:id' component={ WeekList } />
    <Route path='/monthList/:id' component={ MonthList } />
    <Route path='/newGroup' component={ NewGroup } />
  </HashRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
