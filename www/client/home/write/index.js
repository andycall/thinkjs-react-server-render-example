import React from 'react'
import { browserHistory } from 'react-router'
import $ from 'jquery'

import Navigator from '../components/navigator/index'
import ArticleList from '../components/articleList/index'
import Editor from '../components/editor/index'

import './index.scss'

export default class Write extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      postList: {}
    }
  }

  componentDidMount () {
    if (!this.context.postList) {
      $.ajax({
        url: '/home/write/list',
        method: 'get',
        data: {
          __CSRF__: this.context.token
        },
        success: (response) => {
          this.setState({
            postList: response.data
          })
        }
      })
    }
    else {
      this.setState({
        postList: this.context.postList
      })
    }
  }

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
          <ArticleList newPost={this.handleNewPost} postList={this.state.postList} style={{ width: '25%'}} pageId={page_id} />
          <Editor style={{width: '74.333%'}} postList={this.state.postList} pageId={page_id} />
        </div>
      </div>
    )
  }
}

Write.contextTypes = {
  token: React.PropTypes.string,
  postList: React.PropTypes.object
}