/*
 * @Author: 刁琪
 * @Date: 2019-09-10 16:31:17
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-28 16:09:43
 */ 
import React from 'react'
import { Toast } from 'antd-mobile';
import { withRouter } from "react-router-dom";
import './index.scss'
import { dateFormat } from '../../utils/date'
import { getCookie, setCookie, delCookie } from '../../utils/cookie'
import userPic from '../../lib/image/user/user.png'
import rightPic from '../../lib/image/user/right.png'
import menuPic from '../../lib/image/user/menu-right.png'

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      touchItem: 0,
      qiandaoInfo: {}
    }
  }
  componentDidMount() {
    document.title='我的'
    const qiandaoInfo = getCookie('qiandaoInfo')
    if (qiandaoInfo) {
      try {
        const info = JSON.parse(qiandaoInfo)
        this.setState({
          qiandaoInfo: info,
          isLogin: true
        })
      } catch(e) {
        delCookie('qiandaoInfo')
      }
    }
  }

  topClick = () => {
    if (this.state.isLogin) {
      console.log('已登录');
    } else {
      this.props.history.push({ pathname: `/login` });
    }
  }

  toSign = () => {
    const signFlag = getCookie('signFlag')
    if (signFlag === dateFormat(new Date(), 'yyyy-MM-dd')) {
      // 今日已经打过卡了 直接去列表页
      Toast.info('您今天已经打过卡了哟', 2);
    } else {
      this.props.history.push({ pathname: `/qiandao` });
    }
  }

  toList = () => {
    if (this.state.qiandaoInfo.groupId) {
      this.props.history.push({ pathname: `/weekList/${this.state.qiandaoInfo.groupId}` });
    } else {
      Toast.info('请先完成今日份的打卡', 2);
    }
  }

  toHistory = () => {
    this.props.history.push({ pathname: `/monthHistory` });
  }

  toNew = () => {
    this.props.history.push({ pathname: `/newGroup` });
  }
  toServe = () => {
    this.props.history.push({ pathname: `/kefu` });
  }

  touch = (num) => {
    this.setState({
      touchItem: num
    })
  }

  touchStop = () => {
    this.setState({
      touchItem: 0
    })
  }

  render () {
    const { touchItem, isLogin, qiandaoInfo } = this.state
    return (
      <div className='user-page'>
        <div className='top'>
          <div className='user-area' onClick={this.topClick}>
            <div className='left-area'>
              <div className='user-pic'>
                <img className='img' src={userPic} alt='头像' />
              </div>
              <div className='user-info'>
                <div className='name'>{isLogin ? qiandaoInfo.nickname : '登录'}</div>
                <div className='mobile'>{isLogin ? qiandaoInfo.mobile : '登录后查看更多信息'}</div>
              </div>
            </div>
            <div className='right-area'>
              <img className='right-img' src={rightPic} alt='right' />
            </div>
          </div>
        </div>
        <div className='mid-area'>
          <div className='window'>
            <div className='item'>
              <div className='num'>{qiandaoInfo.todayWeight || '--'}</div>
              <div className='info'>今日体重</div>
            </div>
            <div className='item'>
              <div className='num'>{qiandaoInfo.weekTargetWeight || '--'}</div>
              <div className='info'>本周目标</div>
            </div>
            <div className='item'>
              <div className='num'>{qiandaoInfo.monthTargetWeight || '--'}</div>
              <div className='info'>本月目标</div>
            </div>
            <div className='item'>
              <div className='num'>{qiandaoInfo.targetWeight || '--'}</div>
              <div className='info'>最终目标</div>
            </div>
          </div>
        </div>
        <div className='menu-list'>
          <div className={`item ${touchItem === 1}`} onClick={this.toSign} onTouchStart={() => { this.touch(1) }} onTouchEnd={ this.touchStop }>
            <div className='text'>每日打卡</div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
          <div className={`item ${touchItem === 2}`} onClick={this.toList} onTouchStart={() => { this.touch(2) }} onTouchEnd={ this.touchStop }>
            <div className='text'>群组制表{qiandaoInfo.groupId && (<div className='infor'>({qiandaoInfo.groupId})</div>)}</div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
          <div className={`item ${touchItem === 3}`} onClick={this.toHistory} onTouchStart={() => { this.touch(3) }} onTouchEnd={ this.touchStop }>
            <div className='text'>打卡记录</div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
          <div className={`item ${touchItem === 4}`} onClick={this.toNew} onTouchStart={() => { this.touch(4) }} onTouchEnd={ this.touchStop }>
            <div className='text'>创建新群 </div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
          <div className={`item ${touchItem === 5}`} onClick={this.toServe} onTouchStart={() => { this.touch(5) }} onTouchEnd={ this.touchStop }>
            <div className='text'>联系客服</div>
            <img className='menu-img' src={menuPic} alt='right' />
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(User)