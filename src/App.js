/*
 * @Author: 刁琪
 * @Date: 2019-09-10 16:31:17
 * @LastEditors: わからないよう
 */
import React from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.scss';
// import { TabBar } from 'antd-mobile';
// import indexIcon from './lib/image/index/index-icon.png';
// import indexIconSelected from './lib/image/index/index-icon-selected.png';
// import userIcon from './lib/image/index/user-icon.png';
// import userIconSelected from './lib/image/index/user-icon-selected.png';
// import Index from './page/index/index.js';
import User from './page/user/index.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '/index',
    }
  }
  componentDidMount() {
    console.log(this.props.match.path);
    this.setState({
      selectedTab: this.props.match.path,
    });
  }

  changeTab = (tabName) => {
    this.props.history.push({ pathname: `/${tabName}` });
  }

  
  render () {
    const { selectedTab } = this.state
    return (
      <div className='App'>
        {/* <TabBar unselectedTintColor='#949494' tintColor='#33A3F4' barTintColor='white' >
          <TabBar.Item title='首页' key='index'
            icon={<img className='index-icon' src={indexIcon} alt='' />}
            selectedIcon={<img className='index-icon' src={indexIconSelected} alt='' />}
            selected={selectedTab === '/index'}
            onPress={ () => {this.changeTab('index') }}
          >
            {selectedTab === '/index' && (<Index />)}
          </TabBar.Item>
          <TabBar.Item title='我的' key='user'
            icon={<img className='index-icon' src={userIcon} alt='' />}
            selectedIcon={<img className='index-icon' src={userIconSelected} alt='' />}
            selected={selectedTab === '/user'}
            onPress={ () => {this.changeTab('user') }}
          > */}
            {selectedTab === '/user' && (<User />)}
          {/* </TabBar.Item>
        </TabBar> */}
      </div>
    );
  }
}

export default App;
