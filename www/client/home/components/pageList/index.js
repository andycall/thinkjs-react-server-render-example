import React from 'react'

import './index.scss'

export default class PageList extends React.Component {

  render () {

    let articleList = this.context.articleList.data.map((val, index) => {
      return (
        <li key={index}>
          <div>
            <div className="list-top">
              <a href="www.baidu.com" className="author-name">{val.name}</a>
              <em> · </em>
              <span className="time">{val.create_time}</span>
            </div>
            <h3 className="list-title">
              <a href="#">{val.article_title}</a>
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
      )
    });

    return (
      <ul className="_namespace">
        {articleList}
      </ul>
    )
  }
}

PageList.contextTypes = {
  articleList: React.PropTypes.object
}
