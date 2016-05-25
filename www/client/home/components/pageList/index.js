import React from 'react'
import { Link } from 'react-router'

import './index.scss'

export default class PageList extends React.Component {

  render () {

    let articleList = this.props.articleList.map((val, index) => {
      return (
        <li key={index}>
          <div>
            <div className="list-top">
              <a className="author-name">{val.name}</a>
              <em> · </em>
              <span className="time">{val.create_time}</span>
            </div>
            <h3 className="list-title">
              <Link to={"/home/post?post_id=" + val.article_id}>{val.article_title}</Link>
            </h3>
            <div className="list-bottom">
              <span>阅读 {this.props.read}</span>
              <span> · </span>
              <span>评论 {this.props.comment}</span>
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
