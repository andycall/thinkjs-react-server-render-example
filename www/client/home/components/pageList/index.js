import React from 'react'
import classNames from 'classnames'

import './index.scss'

import image from './image/a.jpg'

export default class PageList extends React.Component {


  render () {
    return (
      <ul className="_namespace">
        <li>
          <a href="#" className="list-img" style={{
            backgroundImage: 'url(' + image + ')'
          }} />
          <div>
            <div className="list-top">
              <a href="www.baidu.com" className="author-name">被小鱼</a>
              <em> · </em>
              <span className="time">4天之前</span>
            </div>
            <h3 className="list-title">
              <a href="#">这10家国内知名的慕课网站, 你知道几个?</a>
            </h3>
            <div className="list-bottom">
              <span>阅读 8100</span>
              <span> · </span>
              <span>评论 149</span>
              <span> · </span>
              <span>喜欢 1041</span>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}
