/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-28 14:03:30
 */ 
import './index.scss'
import React from 'react'
import { Button, Toast } from 'antd-mobile';
import { setCookie } from '../../utils/cookie'
import { login } from '../../api/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: ''
    }
  }


  componentDidMount() {
    document.title='登录'
    if (this.props.location.state) {
      this.setState({
        mobile: this.props.location.state.mobile
      })
    }
  }


  changemobile = () => { this.setState({ mobile: this.mobile.value }) }
  changepassword = () => { this.setState({ password: this.password.value }) }
  validate = () => {
    if (!this.state.mobile) { return '请输入手机号' }
    if (!this.state.password) { return '请输入密码' }
    const exp = /^1([3|4|5|7|8|])\d{9}$/
    if (!exp.test(this.state.mobile)) { return '手机号格式不正确' }
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
      password: this.state.password
    }
    login(param).then(res => {
      if (res.code === '200') {
        param.nickname = `用户${this.state.mobile.slice(7)}`
        setCookie('qiandaoInfo', JSON.stringify(param));
        Toast.success('登录成功', 2, () => {
          this.props.history.goBack()
        });
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
  toCreat = () => {
    this.props.history.replace({ pathname: `/register` });
  }
  render () {
    const { mobile, password } = this.state
    return (
      <div className='login-page'>
        <div className='top-info'>登录</div>
        <div className='form-area'>
          <div className='ipt-area'>
            <input className='ipt' value={mobile} onChange={this.changemobile} placeholder='请输入手机号' type='tel' ref={(c) => { this.mobile = c; }} />
          </div>
          <div className='ipt-area'>
            <input className='ipt' value={password} onChange={this.changepassword} onKeyPress={this.handleEnterKey} placeholder='请输入密码' type='password' ref={(c) => { this.password = c; }} />
          </div>
        </div>
        <div className='sign-area'>
          <Button type='primary' onClick={this.signIn}>登录</Button>
        </div>
        <div className='creat'>
          <span className='creat-btn' onClick={this.toCreat}>快速注册</span>
        </div>
      </div>
    )
  }
}
export default Login