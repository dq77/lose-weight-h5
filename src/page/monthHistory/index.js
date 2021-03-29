/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:23:58
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-09-02 14:58:16
 */ 
import './index.scss'
import React from 'react'
import { DatePicker, Toast, List } from 'antd-mobile';
import { getUserMonthList } from '../../api/qiandao';
import { dateFormat } from '../../utils/date'
import { getCookie, delCookie } from '../../utils/cookie'

class MonthHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      qiandaoInfo: {},
      dataList: []
    }
  }


  componentDidMount() {
    document.title='打卡记录'
    const qiandaoInfo = getCookie('qiandaoInfo') || localStorage.getItem('qiandaoInfo')
    if (qiandaoInfo) {
      try {
        const info = JSON.parse(qiandaoInfo)
        this.setState({
          qiandaoInfo: info
        }, () => { this.getList() })
      } catch(e) {
        localStorage.removeItem('qiandaoInfo')
        delCookie('qiandaoInfo')
      }
    }
  }


  getList = () => {
    const param = {
      mobile: this.state.qiandaoInfo.mobile,
      year: this.state.date.getFullYear(),
      month: this.state.date.getMonth() + 1
    }
    getUserMonthList(param).then(res => {
      if (res.code === '200') {
        let newList = res.data.weights.filter(item => {
          return item.dayWeight !== -1
        })
        newList.map((item, index) => {
          return item.than = this.getThanByData(item, newList, index)
        })
        this.setState({
          dataList: newList.reverse()
        })
        console.log(newList);
      } else {
        Toast.fail(res.msg, 2);
      }
    })
  }
  getThanByData = (item, rowList, index) => {
    let lastWeight = null
    for (let i = index-1;i>=0;i--) {
      if (!lastWeight) {
        lastWeight = rowList[i].dayWeight
      }
    }
    let than = 0
    if (lastWeight && item.dayWeight > 0) {
      than = item.dayWeight - lastWeight
    }
    return than
  }

  changeMonth = (date) => {
    this.setState({ date }, () => { this.getList() })
  }

  render () {
    const { date, dataList } = this.state
    return (
      <div className='month-history-page'>
        <DatePicker mode='month' value={date} onChange={date => this.changeMonth(date)} format={(value) =>{ return dateFormat(value, 'yyyy-MM') }} maxDate={new Date()}>
          <List.Item arrow='horizontal'>选择月份</List.Item>
        </DatePicker>
        <div className='title'>
          <div>打卡记录</div><div>共{dataList.length}条数据</div>
        </div>
        <div className='list'>
          {dataList.map(item => { return (
            <div className='item' key={item.dateString}>
              <div className='weight'>{item.dayWeight}</div>
              <div className='info'>
                <div>{item.dateString} {item.weekDay}</div>
                <div className={`than ${item.than > 0 && 'yellow'} ${item.than < 0 && 'green'}`}>{item.than >= 0 && '+'}{item.than}</div>
              </div>
            </div>
          )})}
        </div>
      </div>
    )
  }
}
export default MonthHistory