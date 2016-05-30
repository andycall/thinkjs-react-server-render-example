import React from 'react'
import Navigator from '../components/navigator/index'
import ContentContainer from '../components/contentContainer/index'
import PostComponent from '../components/post/index'
import UserMenu from '../components/usermenu/index'
import Comment from '../components/comment/index'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import $ from 'jquery'

import './index.scss'

export default class Post extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      content: {},
      comment: [],
      postId: null,
      defaultPostId: null
    }
  }

  refreshComment (postId) {
    $.ajax({
      url: '/home/post/comment',
      method: 'get',
      data: {
        post_id: postId,
        __CSRF__: this.context.token
      },
      success: (response) => {
        if (response.errno === 0) {
          this.setState({
            comment: response.data
          })
        }
      }
    })
  }

  componentDidMount () {
    let postId = this.props.location.query.post_id;
    let isNew = false;

    if (!postId) {
      browserHistory.push({
        location: '/'
      });
    }

    if (this.context.commentContent && this.context.postContent.article_id === postId) {
      this.setState({
        comment: this.context.commentContent,
        postId: postId
      })
    }
    else {
      $.ajax({
        url: '/home/post/comment',
        method: 'get',
        data: {
          post_id: postId,
          __CSRF__: this.context.token
        },
        success: (response) => {
          if (response.errno === 0) {
            this.setState({
              comment: response.data,
              postId: postId
            })
          }
        }
      })
    }

    if (this.context.postContent && this.context.postContent.article_id === postId) {
      this.setState({
        content: this.context.postContent,
        postId: postId
      })
    }
    else {
      $.ajax({
        url: "/home/post/content",
        method: 'get',
        data: {
          post_id: postId,
          __CSRF__: this.context.token
        },
        success: (response) => {
          if (response.errno === 0) {
            this.setState({
              content: response.data,
              postId: postId
            })
          }
        }
      })
    }
  }

  componentWillUnmount () {
    console.log(111);
  }

  render () {
    let post;
    let postId = this.props.location.query.post_id;

    if (!_.isEmpty(this.state.content)) {
      post = <PostComponent post={this.state.content} commentCount={this.state.comment.length} />
    }

    return (
      <div className="_namespace">
        <ContentContainer>
          <Navigator />
          <UserMenu />
          {post}
          <Comment refreshComment={this.refreshComment.bind(this)} pageId={postId} comment={this.state.comment} />
        </ContentContainer>
      </div>
    )
  }
}

Post.contextTypes = {
  token: React.PropTypes.string,
  postContent: React.PropTypes.object,
  commentContent: React.PropTypes.array
}