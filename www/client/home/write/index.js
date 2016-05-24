import React from 'react'
import { browserHistory } from 'react-router'

import Navigator from '../components/navigator/index'
import ArticleList from '../components/articleList/index'
import Editor from '../components/editor/index'

import './index.scss'

export default class Write extends React.Component {
  handleNewPost () {
    browserHistory.push({
      pathname: '/home/write'
    })
  }

  render () {
    let page_id = this.props.location.query.page_id || 0

    return (
      <div className="_namespace">
        <Navigator />
        <div className="rightContainer">
          <ArticleList newPost={this.handleNewPost} style={{ width: '25%'}} pageId={page_id} />
          <Editor style={{width: '74.333%'}} pageId={page_id} />
        </div>
      </div>
    )
  }
}