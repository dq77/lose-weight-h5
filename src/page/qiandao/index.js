/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-09-07 15:26:44
 */ 
import './index.scss'
import React from 'react'
import { List, InputItem, Button, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { writeInfo } from '../../api/qiandao';
import { dateFormat } from '../../utils/date'
import { getCookie, setCookie, delCookie } from '../../utils/cookie'

class Qiandao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: '',
      week: '',
      mobile: '',
      groupId: '',
      nickname: '',
      height: '',
      targetWeight: '',
      monthTargetWeight: '',
      weekTargetWeight: '',
      todayWeight: '',
    }
  }


  componentDidMount() {
    document.title='每日打卡'
    const qiandaoInfo = getCookie('qiandaoInfo') || localStorage.getItem('qiandaoInfo')
    if (qiandaoInfo) {
      try {
        const info = JSON.parse(qiandaoInfo)
        const signFlag = getCookie('signFlag') || localStorage.getItem('signFlag')
        if (signFlag === dateFormat(new Date(), 'yyyy-MM-dd')) {
          // 今日已经打过卡了 直接去列表页
          this.setState({ groupId: info.groupId }, () => {
            this.toPaper()
          })
        }
        this.setState({
          mobile: info.mobile,
          groupId: info.groupId,
          nickname: info.nickname,
          height: info.height,
          targetWeight: info.targetWeight,
          monthTargetWeight: info.monthTargetWeight,
          weekTargetWeight: info.weekTargetWeight,
        })
      } catch(e) {
        localStorage.removeItem('qiandaoInfo')
        delCookie('qiandaoInfo')
      }
    }
    this.getDay()
  }

  getDay = () => {
    const today = dateFormat(new Date(), 'yyyy年MM月dd日')
    const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date().getDay()]
    this.setState({ today: today, week: week })
  }

  changemobile = (mobile) => { this.setState({ mobile: mobile.replace(/\s*/g,"") }) }
  changegroupId = (groupId) => { this.setState({ groupId: groupId }) }
  changenickname = (nickname) => { this.setState({ nickname: nickname }) }
  changeheight = (height) => { this.setState({ height: height }) }
  changetargetWeight = (targetWeight) => { this.setState({ targetWeight: targetWeight }) }
  changemonthTargetWeight = (monthTargetWeight) => { this.setState({ monthTargetWeight: monthTargetWeight }) }
  changeweekTargetWeight = (weekTargetWeight) => { this.setState({ weekTargetWeight: weekTargetWeight }) }
  changetodayWeight = (todayWeight) => { this.setState({ todayWeight: todayWeight }) }
  validate = () => {
    if (!this.state.mobile) { return '请输入手机号' }
    if (!this.state.groupId) { return '请输入群号' }
    if (!this.state.nickname) { return '请输入昵称' }
    if (!this.state.height) { return '请输入身高' }
    if (!this.state.targetWeight) { return '请输入目标体重' }
    if (!this.state.monthTargetWeight) { return '请输入月目标体重' }
    if (!this.state.weekTargetWeight) { return '请输入周目标体重' }
    if (!this.state.todayWeight) { return '请输入今日体重' }
    return 200
  }
  signIn = () => {
    const valid = this.validate()
    if (valid !== 200) {
      Toast.fail(valid, 2);
      return
    }
    const param = {
      mobile: this.state.mobile,
      groupId: this.state.groupId,
      nickname: this.state.nickname,
      height: this.state.height,
      targetWeight: this.state.targetWeight,
      weekTargetWeight: this.state.weekTargetWeight,
      monthTargetWeight: this.state.monthTargetWeight,
      todayWeight: this.state.todayWeight
    }
    writeInfo(param).then(res => {
      if (res.code === '200') {
        // localStorage.setItem('qiandaoInfo', JSON.stringify(param));
        // localStorage.setItem('signFlag', dateFormat(new Date(), 'yyyy-MM-dd'));
        setCookie('qiandaoInfo', JSON.stringify(param))
        setCookie('signFlag', dateFormat(new Date(), 'yyyy-MM-dd'))
        Modal.alert('打卡成功', '恭喜您，打卡成功！', [
          { text: '返回', onPress: () => this.toUser()},
          { text: '查看周报', onPress: () => this.toPaper() }
        ])
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  handleEnterKey = (e) => {
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
      this.signIn()
    }
  }
  toPaper = () => {
    this.props.history.replace({ pathname: `/weekList/${this.state.groupId}` });
  }
  toUser = () => {
    this.props.history.push({ pathname: `/user` });
  }
  toServe = () => {
    this.props.history.push({ pathname: `/kefu` });
  }
  toCreat = () => {
    this.props.history.push({ pathname: `/newGroup` });
  }
  render () {
    const { today, week, mobile, groupId, nickname, height, targetWeight, monthTargetWeight, weekTargetWeight, todayWeight } = this.state
    return (
      <div className='qiandao-page'>
        <div className='top-info'>
          <span onClick={this.show}>{today}</span> <span className='week'>{week}</span>
        </div>
        <div className='form-area'>
          <List>
            <InputItem labelNumber={6} onChange={this.changemobile} type='phone' value={mobile} placeholder='请输入手机号'>手机号码</InputItem>
            <InputItem labelNumber={6} onChange={this.changegroupId} type='digit' value={groupId} placeholder='请输入群号'>群号</InputItem>
            <InputItem labelNumber={6} onChange={this.changenickname} value={nickname} placeholder='请输入昵称'>昵称</InputItem>
            <InputItem labelNumber={6} onChange={this.changeheight} type='digit' value={height} placeholder='请输入身高' extra='cm'>身高</InputItem>
            <InputItem labelNumber={6} onChange={this.changetargetWeight} type='digit' value={targetWeight} placeholder='请输入目标体重' extra='kg'>目标体重</InputItem>
            <InputItem labelNumber={6} onChange={this.changemonthTargetWeight} type='digit' value={monthTargetWeight} placeholder='请输入月目标体重' extra='kg'>月目标体重</InputItem>
            <InputItem labelNumber={6} onChange={this.changeweekTargetWeight} type='digit' value={weekTargetWeight} placeholder='请输入周目标体重' extra='kg'>周目标体重</InputItem>
            <InputItem labelNumber={6} onChange={this.changetodayWeight} type='digit' value={todayWeight} placeholder='请输入今日体重' extra='kg' onKeyPress={this.handleEnterKey}>今日体重</InputItem>
          </List>
        </div>
        <div className='sign-area'>
          <Button type='primary' onClick={this.signIn}>打卡</Button>
        </div>
        <div className='creat'>
          <span className='creat-btn' onClick={this.toServe}>联系客服</span>
          <span className='creat-btn' onClick={this.toCreat}>创建群</span>
        </div>
      </div>
    )
  }
}
export default createForm()(Qiandao);