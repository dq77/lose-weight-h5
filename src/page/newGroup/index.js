/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-09-07 13:36:39
 */ 
import './index.scss'
import React from 'react'
import { List, InputItem, Button, Modal, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import copy from 'copy-to-clipboard';
import { setCookie, delCookie } from '../../utils/cookie'
import { creatGroup } from '../../api/qiandao';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      groupName: '',
      groupSize: ''
    }
  }


  componentDidMount() {
    document.title='创建群'
  }

  changemobile = (mobile) => { this.setState({ mobile: mobile.replace(/\s*/g,"") }) }
  changegroupName = (groupName) => { this.setState({ groupName: groupName }) }
  changegroupSize = (groupSize) => { this.setState({ groupSize: groupSize }) }
  validate = () => {
    if (!this.state.mobile) { return '请输入手机号' }
    if (!this.state.groupName) { return '请输入群名称' }
    if (!this.state.groupSize) { return '请输入群容量' }
    if (this.state.mobile.length !== 11) { return '手机号格式不正确' }
    if (this.state.groupSize > 200) { return '群最多支持200人' }
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
      groupName: this.state.groupName,
      groupSize: this.state.groupSize
    }
    creatGroup(param).then(res => {
      if (res.code === '200') {
        setCookie('qiandaoInfo', JSON.stringify({
          mobile: this.state.mobile,
          groupId: res.data.groupId,
        }));
        delCookie('signFlag');
        Modal.alert('创建成功', (
          <div>
            <div>恭喜您，群创建成功</div>
            <div style={{ textAlign: 'left', paddingLeft: 40}} >　群号：{res.data.groupId}　　
            <span style={{ color: '#108ee9', textDecoration: 'underline', touchAction:'none'}} onClick={() => {this.copyText(res.data.groupId)}}>复制</span></div>
            <div style={{ textAlign: 'left', paddingLeft: 40}}>群名称：{this.state.groupName}</div>
          </div>
        ), [{ text: '返回', onPress: () => {}}, { text: '前往打卡', onPress: () => this.toSign() }])
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  copyText = (text) => {
    copy(text);
    Toast.success('复制成功', 1);
  }
  toSign = () => {
    this.props.history.push({ pathname: `/qiandao` });
  }
  render () {
    const { mobile, groupName, groupSize } = this.state
    return (
      <div className='creat-group-page'>
        <div className='form-area'>
          <List>
            <InputItem labelNumber={6} onChange={this.changemobile} type='phone' value={mobile} placeholder='请输入手机号'>手机号码</InputItem>
            <InputItem labelNumber={6} onChange={this.changegroupName} value={groupName} placeholder='请输入群名称'>群名称</InputItem>
            <InputItem labelNumber={6} onChange={this.changegroupSize} type='digit' value={groupSize} placeholder='请输入群最大人数' extra='人'>群容量</InputItem>
          </List>
        </div>
        <div className='sign-area'>
          <Button type='primary' onClick={this.signIn}>创建群</Button>
        </div>
      </div>
    )
  }
}
export default createForm()(Group);