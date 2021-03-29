/*
 * @Author: 刁琪
 * @Date: 2020-07-23 20:00:20
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-09-08 11:38:14
 */
import React from 'react'
import { Toast, DatePicker, List } from 'antd-mobile';
import ReactEcharts from 'echarts-for-react';
import { getMonthList } from '../../api/qiandao';
import { dateFormat } from '../../utils/date'
import './index.scss'

class MonthList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: this.props.match.params.id,
      groupName: '',
      date: new Date(),
      groupMembers: [],
      activeItem: {},
      loading: true
    }
  }


  componentDidMount() {
    document.title = '月统计列表'
    console.log(document.documentElement.clientWidth);
    this.getList()
  }

  getList = () => {
    const params = {
      groupId: this.state.groupId,
      month:this.state.date.getMonth()+1,
      year: this.state.date.getFullYear()
    }
    getMonthList(params).then(res => {
      if (res.code === '200') {
        this.setState({
          groupMembers: res.data.groupMembers,
          groupName: res.data.groupName,
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
    let className = 'w70'
    if (lastWeight && item.dayWeight > 0) {
      if (item.dayWeight < lastWeight) {
        className += ' green'
      } else if (item.dayWeight > lastWeight) {
        className += ' yellow'
      }
    }
    return className
  }
  changeMonth = (date) => {
    this.setState({ date }, () => { this.getList() })
  }

  toWeek = () => {
    this.props.history.replace({ pathname: `/weekList/${this.state.groupId}` });
  }

  getEchartOption = () => {
    const item = this.state.activeItem
    return {
      title: {
        text: item.nickname,
        subtext: `身高：${item.height} 　 月目标：${item.monthTargetWeight<0?'-':item.monthTargetWeight} 　 总目标：${item.targetWeight} `,
        left: 'center',
        top: 14
      },
      xAxis: {
        type: 'category',
        data: item.weights.map(oneDay => {
          return oneDay.dateString.slice(5)
        })
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
    const { groupMembers, activeItem, groupName, groupId, loading, date } = this.state
    return (
      <div className='monthlist-page'>
        <List className='top-list'>
          <List.Item arrow='horizontal' onClick={this.toWeek} extra={'查看周数据'}>
            {groupName} ({groupId})
          </List.Item>
          <DatePicker mode='month' value={date} onChange={date => this.changeMonth(date)} format={(value) =>{ return dateFormat(value, 'yyyy-MM') }} maxDate={new Date()}>
            <List.Item arrow='horizontal'>选择月份</List.Item>
          </DatePicker>
        </List>
        <div className={`report-box ${loading} ${!!activeItem.weights}active`}>
          <div className='left-area'>
              <div className='content-area'>
                  <table className='table' border='0' cellSpacing='0'>
                    <tbody>
                      <tr><td style={{backgroundColor: '#ecf5ff',fontWeight: 'bold'}}>昵称</td></tr>
                      <tr><td>身高</td></tr>
                      <tr><td>入表</td></tr>
                      <tr><td>总目标</td></tr>
                      <tr><td>月目标</td></tr>
                      <tr><td className='bbline'>月减</td></tr>
                      {groupMembers[0] && groupMembers[0].weights.map(item => {return (
                        <tr key={item.dateString}><td>{item.dateString.slice(5)}</td></tr>
                      )})}
                      <tr><td style={{visibility: 'hidden'}} /></tr>
                    </tbody>
                  </table>
              </div>
          </div>
          <div className='right-area' style={{width: `${document.documentElement.clientWidth-47}px`}}>
            <div className='content-area'>
                <table className='right-content-table' style={{width: `${71 * groupMembers.length}px`}} border='0' cellSpacing='0'>
                  <tbody>
                    <tr>
                      {groupMembers.map(item => {return (
                        <td className='nickname' onClick={() => { this.clickLine(item) }} key={item.mobile}>{item.nickname}</td>
                      )})}
                    </tr>
                    <tr>
                      {groupMembers.map(item => {return (
                        <td onClick={() => { this.clickLine(item) }} key={item.mobile}>{item.height}</td>
                      )})}
                    </tr>
                    <tr>
                      {groupMembers.map(item => {return (
                        <td onClick={() => { this.clickLine(item) }} key={item.mobile}>{item.initWeight}</td>
                      )})}
                    </tr>
                    <tr>
                      {groupMembers.map(item => {return (
                        <td onClick={() => { this.clickLine(item) }} key={item.mobile}>{item.targetWeight}</td>
                      )})}
                    </tr>
                    <tr>
                      {groupMembers.map(item => {return (
                        <td onClick={() => { this.clickLine(item) }} key={item.mobile}>{item.monthTargetWeight>0?item.monthTargetWeight:'-'}</td>
                      )})}
                    </tr>
                    <tr>
                      {groupMembers.map(item => {return (
                        <td onClick={() => { this.clickLine(item) }} className='bbline' key={item.mobile}>{item.monthReduce}</td>
                      )})}
                    </tr>
                    {groupMembers[0] && groupMembers[0].weights.map((day, index) => {return (
                      <tr key={day.dateString}>
                        {groupMembers.map(item => {return (
                          <td key={item.mobile} onClick={() => { this.clickLine(item) }} className={this.getColorByData(item.weights[index], item.weights, index)}>
                            {item.weights[index].dayWeight>0?item.weights[index].dayWeight:'-'}
                          </td>
                        )})}
                      </tr>
                    )})}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        {loading && (
          <div className='loading-tip'>加载中</div>
        )}
        {activeItem.weights && (
          <div className='echart-area'>
            <ReactEcharts option={this.getEchartOption()} />
          </div>
        )}
      </div>
    )
  }
}
export default MonthList;