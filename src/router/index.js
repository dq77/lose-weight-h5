import React from 'react';
import {
    BrowserRouter,
    Route,
    Redirect
} from 'react-router-dom'
import App from '../App';
import Qiandao from '../page/qiandao/index';
import WeekList from '../page/weekList/index';
import MonthList from '../page/monthList/index';
import NewGroup from '../page/newGroup/index';
import Login from '../page/login/index';
import Register from '../page/login/register';
import MonthHistory from '../page/monthHistory/index';
import Kefu from '../page/kefu/index';
import UserSetting from '../page/userSetting/index';
import Minapp from '../page/minapp/index';


// 路由配置
const routes = [
    {path: "/", render: () => <Redirect to='/user' push />},
    {path: "/index", component: App},
    {path: "/user", component: App},
    {path: "/qiandao", component: Qiandao},
    {path: "/weekList/:id", component: WeekList},
    {path: "/monthList/:id", component: MonthList},
    {path: "/newGroup", component: NewGroup},
    {path: "/login", component: Login},
    {path: "/register", component: Register},
    {path: "/monthHistory", component: MonthHistory},
    {path: "/kefu", component: Kefu},
    {path: "/userSetting", component: UserSetting},
    {path: "/minapp", component: Minapp},
];

const AppRouter = () => (
  <BrowserRouter>
    {
      routes.map((page, index) => (
        <Route key={index} exact path={page.path} component={page.component} render={page.render}/>
      ))
    }
  </BrowserRouter>
);
export default AppRouter
