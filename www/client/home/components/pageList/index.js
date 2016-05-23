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
              <a href="www.baidu.com" className="author-name">{this.props.writer}   </a>
              <em> · </em>
              <span className="time">4天之前</span>
            </div>
            <h3 className="list-title">
              <a href="#">{this.props.title}</a>
            </h3>
            <div className="list-bottom">
              <span>阅读 {this.props.read}</span>
              <span> · </span>
              <span>评论 {this.props.comment}</span>
              <span> · </span>
              <span>喜欢 {this.props.like}</span>
            </div>
          </div>
        </li>
      </ul>
    )
  }
}
