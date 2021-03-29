/*
 * @Author: 刁琪
 * @Date: 2019-09-10 17:38:55
 * @LastEditors: 刁琪
 * @LastEditTime: 2020-07-27 17:20:01
 */ 
/* eslint-disable react/jsx-no-bind */
import './index.scss'
import React from 'react'
import { Carousel } from 'antd-mobile';
import { Link } from 'react-router-dom';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{url: '', img: ''}],
      imgHeight: 176,
    }
  }
  componentDidMount() {
    this.setState({
      list: this.props.list
    });
  }


  render () {
    let { list } = this.props
    return (
          <Carousel className="banner-page" autoplay infinite >
            {list.map(item => (

              <Link className="banner-link" key={item} to={item.url}>
                <img
                  src={item.img} alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </Link>
            ))}
          </Carousel>
    )
  }
}
export default Banner