/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-28 14:07:19
 */ 
import './index.scss'
import React from 'react'
import { Button, Toast } from 'antd-mobile';
import { login } from '../../api/user';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
      password2: ''
    }
  }


  componentDidMount() {
    document.title='注册'
  }


  changemobile = () => { this.setState({ mobile: this.mobile.value }) }
  changepassword = () => { this.setState({ password: this.password.value }) }
  changepassword2 = () => { this.setState({ password2: this.password2.value }) }
  validate = () => {
    if (!this.state.mobile) { return '请输入手机号' }
    if (!this.state.password) { return '请输入密码' }
    const exp = /^1([3|4|5|7|8|])\d{9}$/
    if (!exp.test(this.state.mobile)) { return '手机号格式不正确' }
    if (this.state.password !== this.state.password2) { return '两次密码不相同' }
    return 200
  }
  signUp = () => {
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
        Toast.success('注册成功', 2, () => {
          this.toLogin()
        });
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  handleEnterKey = (e) => {
    if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
      this.signUp()
    }
  }
  toLogin = () => {
    this.props.history.replace({ pathname: `/login`, state: { mobile: this.state.mobile } });
  }
  render () {
    const { mobile, password, password2 } = this.state
    return (
      <div className='login-page'>
        <div className='top-info'>注册</div>
        <div className='form-area'>
          <div className='ipt-area'>
            <input className='ipt' value={mobile} onChange={this.changemobile} placeholder='请输入手机号' type='tel' ref={(c) => { this.mobile = c; }} />
          </div>
          <div className='ipt-area'>
            <input className='ipt' value={password} onChange={this.changepassword} placeholder='请输入密码' type='password' ref={(c) => { this.password = c; }} />
          </div>
          <div className='ipt-area'>
            <input className='ipt' value={password2} onChange={this.changepassword2} onKeyPress={this.handleEnterKey} placeholder='请再次输入密码' type='password' ref={(c) => { this.password2 = c; }} />
          </div>
        </div>
        <div className='sign-area'>
          <Button type='primary' onClick={this.signUp}>注册</Button>
        </div>
        <div className='creat'>
          <span className='creat-btn' onClick={this.toLogin}>返回登录</span>
        </div>
      </div>
    )
  }
}
export default Register