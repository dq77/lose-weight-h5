/*
 * @Author: 刁琪
 * @Date: 2020-07-23 20:00:20
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-09-07 16:02:16
 */
import React from 'react'
import { Toast, DatePicker, List, ActionSheet, Modal } from 'antd-mobile';
import ReactEcharts from 'echarts-for-react';
import { getWeekList, delPerson, quitGroup } from '../../api/qiandao';
import { isIPhone } from '../../utils/regexp'
import { getCookie, delCookie } from '../../utils/cookie'
import './index.scss'

let wrapProps;
if (isIPhone) { wrapProps = { onTouchStart: e => e.preventDefault(), }; }

class WeekList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.match.params.id,
      groupName: '',
      date: new Date(),
      weekGroupDatas: [],
      activeItem: {},
      qiandaoInfo: {},
      loading: true
    }
  }


  componentDidMount() {
    document.title = '周统计列表'
    const qiandaoInfo = getCookie('qiandaoInfo') || localStorage.getItem('qiandaoInfo')
    if (qiandaoInfo) {
      try {
        const info = JSON.parse(qiandaoInfo)
        this.setState({
          qiandaoInfo: info
        })
      } catch(e) {
        localStorage.removeItem('qiandaoInfo')
        delCookie('qiandaoInfo')
      }
    }
    this.getList()
  }

  getList = () => {
    const params = {
      groupId: this.state.groupId,
      week: this.getWeekOfYear(),
      year: this.state.date.getFullYear()
    }
    getWeekList(params).then(res => {
      if (res.code === '200') {
        // 跨月的周，月减字段和月目标字段的筛选
        res.data.groupMembers.map(member => {
          const monthReduce = member.monthReduces.filter(item => {
            return item.month === this.state.date.getMonth()+1
          })[0]
          const monthTargetWeight = member.monthTargetWeights.filter(item => {
            return item.month === this.state.date.getMonth()+1
          })[0]
          member.monthReduce = monthReduce ? monthReduce.monthReduce : '-'
          member.monthTargetWeight = monthTargetWeight ? monthTargetWeight.monthTargetWeight : '-'
          return false
        })
        this.setState({
          weekGroupDatas: res.data.groupMembers,
          groupName: res.data.groupName,
          activeItem: {},
          loading: false
        })
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  topClick = () => {
    this.setState({
      activeItem: {}
    })
  }
  clickLine = (item) => {
    if (this.state.activeItem.mobile === item.mobile) {
      this.setState({
        activeItem: {}
      })
    } else {
      this.setState({
        activeItem: item
      })
    }
  }
  getColorByData = (item, row, index) => {
    const rowList = row.map(one => { return one.dayWeight > 0 ? one.dayWeight : null })
    let lastWeight = null
    for (let i = index-1;i>=0;i--) {
      if (!lastWeight) {
        lastWeight = rowList[i]
      }
    }
    let className = 'w46'
    if (lastWeight && item.dayWeight > 0) {
      if (item.dayWeight < lastWeight) {
        className += ' green'
      } else if (item.dayWeight > lastWeight) {
        className += ' yellow'
      }
    }
    return className
  }
  getWeekOfYear = () => {
    const today = this.state.date
    let firstDay = new Date(today.getFullYear(),0, 1);
    const dayOfWeek = firstDay.getDay(); 
    let spendDay= 1;
    if (dayOfWeek !== 0) {
      spendDay=7-dayOfWeek+1;
    }
    firstDay = new Date(today.getFullYear(),0, 1+spendDay);
    const d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
    const result =Math.ceil(d/7);
    return result+1;
  }

  changeWeek = (date) => {
    this.setState({ date }, () => { this.getList() })
  }

  editSign = () => {
    localStorage.removeItem('signFlag');
    delCookie('signFlag')
    this.props.history.replace({ pathname: `/qiandao` });
  }
  // 多功能菜单点击
  showActionSheet = () => {
    const BUTTONS = ['前往月统计', '修改打卡', '取消'] // , '退出该群'
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      // destructiveButtonIndex: BUTTONS.length - 2,
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      switch(buttonIndex) {
        case 0:
          this.toMonth()
        break;
        case 1:
          this.editSign()
        break;
        case 2:
          // this.quitGroup()
        break;
        default:
      }
    });
  }
  delItem = () => {
    Modal.alert('移除群员', `是否移除 “${this.state.activeItem.nickname}” ？`, [
      { text: '取消', onPress: () => {}},
      { text: '确定', onPress: () => {
        const params = {
          groupId: this.state.groupId,
          mobile: this.state.activeItem.mobile
        }
        delPerson(params).then(res => {
          if (res.code === '200') {
            Toast.success('移除成功', 2)
            this.getList()
          } else {
            Toast.fail(res.msg, 2);
          }
        })
      }, style: {color: '#f56c6c'} }
    ])
  }

  quitGroup = () => {
    Modal.alert('退出群组', `确认退出 “${this.state.groupName}” 吗？`, [
      { text: '取消', onPress: () => {}},
      { text: '确定', onPress: () => {
        const params = {
          groupId: this.state.groupId,
          mobile: this.state.qiandaoInfo.mobile
        }
        quitGroup(params).then(res => {
          if (res.code === '200') {
            Toast.success('退出成功', 2)
            this.editSign()
          } else {
            Toast.fail(res.msg, 2);
          }
        })
      }, style: {color: '#f56c6c'} }
    ])
  }

  toMonth = () => {
    this.props.history.replace({ pathname: `/monthList/${this.state.groupId}` });
  }

  getEchartOption = () => {
    const item = this.state.activeItem
    return {
      title: {
        text: item.nickname,
        subtext: `身高：${item.height} 　 周目标：${item.weekTargetWeight<0?'-':item.weekTargetWeight} 　 总目标：${item.targetWeight} `,
        left: 'center',
        top: 14
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        min: function (value) {
          return value.min - 6;
        },
        max: function (value) {
          return value.max + 6;
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        bottom: 40,
        height: 180,
        top: 60
      },
      series: [{
        data: item.weights.map(item => {
          return item.dayWeight > 0 ? item.dayWeight : null
        }),
        type: 'line',
        connectNulls: true,
        itemStyle: {
          color: '#E6A23C',
        },
        lineStyle: {
          color: '#E6A23C'
        }
      }]
    }
  }

  render() {
    const { weekGroupDatas, activeItem, groupName, groupId, loading, date } = this.state
    return (
      <div className='weeklist-page'>
        <List className='top-list'>
          <List.Item arrow='horizontal' onClick={this.showActionSheet} extra={'更多功能'}>
            {groupName} ({groupId})
          </List.Item>
          <DatePicker mode='date' value={date} onChange={date => this.changeWeek(date)} maxDate={new Date()}>
            <List.Item arrow='horizontal'>选择日期</List.Item>
          </DatePicker>
        </List>
        <div className='table-area'>
          <div className='thead-area'>
            <table className='list-table' border='1' cellSpacing='0'>
              <thead>
                <tr>
                  <td className='w70'>昵称</td>
                  <td className='w46 brline'>身高</td>
                  <td className='w46'>一</td>
                  <td className='w46'>二</td>
                  <td className='w46'>三</td>
                  <td className='w46'>四</td>
                  <td className='w46'>五</td>
                  <td className='w46'>六</td>
                  <td className='w46 brline'>日</td>
                  <td className='w46'>周减</td>
                  <td className='w46'>月减</td>
                  <td className='w46'>周目标</td>
                  <td className='w46'>月目标</td>
                  <td className='w46'>总目标</td>
                  <td className='w46'>入表</td></tr>
              </thead>
            </table>
          </div>
          <div className={`tbody-area ${!!activeItem.weights}`}>
            <table className='list-table' border='1' cellSpacing='0'>
              <tbody>
                {weekGroupDatas.map(item => (
                  <tr key={item.mobile} onClick={() => { this.clickLine(item) }} className={item.mobile === activeItem.mobile ? 'active' : ''}>
                    <td className='w70 nickname'>{item.nickname}</td>
                    <td className='w46 brline'>{item.height}</td>
                    {item.weights.map((one, index) => (
                      <td key={index} className={`${this.getColorByData(one, item.weights, index)} ${index===6 && 'brline'}`}>
                        {one.dayWeight < 0 ? '-' : one.dayWeight}
                      </td>
                    ))}
                    <td className={`w46 ${item.weekReduce > 0 ? 'green' : ''} ${item.weekReduce < 0 ? 'yellow' : ''}`}>{item.weekReduce}</td>
                    <td className={`w46 ${item.monthReduce > 0 ? 'green' : ''} ${item.monthReduce < 0 ? 'yellow' : ''}`}>{item.monthReduce}</td>
                    <td className='w46'>{item.weekTargetWeight < 0 ? '-' : item.weekTargetWeight}</td>
                    <td className='w46'>{item.monthTargetWeight}</td>
                    <td className='w46'>{item.targetWeight}</td>
                    <td className='w46'>{item.initWeight}</td>
                  </tr>
                ))}
                {loading && (<tr><td>加载中</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
        {!activeItem.weights && (
          <div className='btm-area'>
            <div className='edit' onClick={this.showActionSheet}>更多功能</div>
            <div>(点击昵称可查看详细数据)</div>
          </div>
        )}
        {activeItem.weights && (
          <div className='echart-area'>
            <div className='top-menu'>
              {/* <div className='del-btn' onClick={this.delItem}>删除该成员</div> */}
            </div>
            <ReactEcharts option={this.getEchartOption()} />
          </div>
        )}
      </div>
    )
  }
}
export default WeekList;