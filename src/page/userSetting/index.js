/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-28 13:45:13
 */ 
import './index.scss'
import React from 'react'
import { List, Modal, Toast } from 'antd-mobile';
import { delCookie } from '../../utils/cookie'


export default class UserSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cacheNum: 0
    }
  }


  componentDidMount() {
    document.title='设置中心'
    let cacheNum = (Math.random() * 20).toFixed(2)
    this.setState({ cacheNum })
  }
  toServe = () => {
    this.props.history.push({ pathname: `/kefu` });
  }
  toMinapp = () => {
    this.props.history.push({ pathname: `/minapp` });
  }
  handleDelCookie = () => {
    Modal.alert('确认删除吗', '请您在删除前记好您的手机号码及群号等信息', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: this.confirmDelete },
    ]);
  }
  logout = () => {
    Modal.alert('确认退出吗', '请您在退出前记好您的手机号码及群号等信息', [
      { text: '取消', onPress: () => {} },
      { text: '确认', onPress: () => {
        Toast.success('退出成功', 1, () => {
          this.confirmDelete()
          this.props.history.goBack()
        });
      } },
    ]);
  }
  confirmDelete = () => {
    delCookie('signFlag')
    delCookie('qiandaoInfo')
    localStorage.removeItem('signFlag')
    localStorage.removeItem('qiandaoInfo')
    this.setState({ cacheNum: 0 })
  }
  editSign = () => {
    delCookie('signFlag')
    this.props.history.replace({ pathname: `/qiandao` });
  }
  render () {
    const { cacheNum } = this.state
    return (
      <div className='user-setting-page'>
        <List renderHeader={() => '基本设置'} className="my-list">
          <List.Item extra="V2.0.2">应用版本</List.Item>
          <List.Item arrow="horizontal" onClick={this.toServe}>联系客服</List.Item>
          <List.Item extra={ `${cacheNum} KB` } arrow="horizontal" onClick={this.handleDelCookie}>清除缓存</List.Item>
          <List.Item arrow="horizontal" onClick={this.toMinapp}>打卡小程序</List.Item>
          {/* <List.Item arrow="horizontal" onClick={this.logout}>退出登录</List.Item> */}
        </List>
        <List renderHeader={() => '打卡设置'} className="my-list">
          <List.Item arrow="horizontal" onClick={this.editSign}>修改打卡</List.Item>
          <List.Item arrow="horizontal" onClick={this.logout}>退出登录</List.Item>
        </List>
      </div>
    )
  }
}