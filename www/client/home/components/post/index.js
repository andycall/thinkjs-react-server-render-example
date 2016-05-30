import React from 'react'

import './index.scss'

export default class PostContent extends React.Component {
  rawMarkup (content) {
    return { __html: content };
  }


  render () {
    let {article_title, name, article_content, create_time} = this.props.post;

    return (
      <div className="_namespace">
        <h1 className="title">{article_title}</h1>
        <div className="meta-top">
          <span className="user">{'作者 ' + name}</span>
          <span className="comments-count">{'评论 ' + this.props.commentCount}</span>
          <span className="comments-count">{'时间 ' + create_time}</span>
        </div>
        <div className="show-content" dangerouslySetInnerHTML={this.rawMarkup(article_content)}></div>
      </div>
    )
  }
}