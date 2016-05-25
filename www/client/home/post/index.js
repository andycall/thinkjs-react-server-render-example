import React from 'react'
import Navigator from '../components/navigator/index'
import ContentContainer from '../components/contentContainer/index'
import PostComponent from '../components/post/index'
import UserMenu from '../components/usermenu/index'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import $ from 'jquery'

import './index.scss'

export default class Post extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      content: {}
    }
  }

  componentDidMount () {
    let postId = this.props.location.query.post_id;

    if (!postId) {
      browserHistory.push({
        location: '/'
      });
    }

    if (this.context.postContent) {
      this.setState({
        content: this.context.postContent
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
              content: response.data
            })
          }
        }
      })
    }
  }

  render () {
    let post;

    if (!_.isEmpty(this.state.content)) {
      post = <PostComponent post={this.state.content} />
    }


    return (
      <div className="_namespace">
        <ContentContainer>
          <Navigator />
          <UserMenu />
          {post}
        </ContentContainer>
      </div>
    )
  }
}

Post.contextTypes = {
  token: React.PropTypes.string,
  postContent: React.PropTypes.object
}