/*
 * @Author: 刁琪
 * @Date: 2019-09-10 16:31:17
 * @LastEditors: わからないよう
 * @LastEditTime: 2020-08-27 14:26:14
 */ 
import './index.scss'
import React from 'react'
import Banner from '../../components/banner/index'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bannerList: [
        {url: '/qiandao', img: 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png'},
        {url: '/weekList', img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png'},
        {url: '/qiandao', img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png'},
      ]
    }
  }

  componentDidMount() {
    document.title = '首页'
  }


  render () {
    let { bannerList } = this.state
    return (
      <div>
        {bannerList.length !== 0 ? <Banner list={bannerList} />: ''}
      </div>
    )
  }
}
export default Home