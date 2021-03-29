/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-28 13:45:13
 */ 
import './index.scss'
import React from 'react'
import kefuPic from '../../lib/image/user/minapp.jpg'

export default class Minapp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: '',
    }
  }


  componentDidMount() {
    document.title='小程序'
  }
  render () {
    return (
      <div className='minapp-page'>
        <div className='text'>长按识别图片进入小程序</div>
        <img className='kefu-img' src={kefuPic} alt='kefu' />
        <div className='min-name'>减重打卡助手</div>
      </div>
    )
  }
}