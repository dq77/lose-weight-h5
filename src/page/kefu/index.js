/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-28 13:45:13
 */ 
import './index.scss'
import React from 'react'
import kefuPic from '../../lib/image/user/kefu.jpeg'

class Kefu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: '',
    }
  }


  componentDidMount() {
    document.title='联系客服'
  }
  render () {
    return (
      <div className='kefu-page'>
        <div className='text'>长按图片添加客服微信</div>
        <img className='kefu-img' src={kefuPic} alt='kefu' />
      </div>
    )
  }
}
export default Kefu