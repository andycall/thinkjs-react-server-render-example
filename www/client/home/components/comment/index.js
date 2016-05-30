import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import $ from 'jquery'

import './index.scss'
import image from './image/user.png'

function findCommentRoot(comments, com) {
  let firstTarget = _.find(comments, (val) => {
    return com.comment_for_id === val.comment_id
  });

  if (firstTarget && firstTarget.comment_for_id <= 0) {
    return _.indexOf(comments, firstTarget);
  }
  else {
    return findCommentRoot(comments, firstTarget)
  }
}

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: '',
      buttonDisable: true,
      commentRow: -1,
      commentTarget: null,
      commentId: null,
      commentTargetUserName: null
    }
  }

  getCommentTop() {
    let commentBox = this.refs.comment;
    let commentNode = ReactDOM.findDOMNode(commentBox);
    return $(commentNode).offset().top
  }

  handleTextAreaChange(e) {
    let buttonState = this.state.buttonDisable;
    if (e.target.value.length > 0) {
      buttonState = false;
    }

    this.setState({
      commentText: e.target.value,
      buttonDisable: buttonState
    })
  }

  handleReply(comment_id, user_id, user_name, row) {


    this.setState({
      commentId: comment_id,
      commentTarget: user_id,
      commentTargetUserName: user_name,
      commentText: `@${user_name} `,
      commentRow: row
    })
  }

  scrollTopSubmit() {
    let scrollTop = this.getCommentTop();

    $('body').animate({
      scrollTop: scrollTop
    })
  }

  onCommentSubmit(isReply) {
    if (this.state.commentText.length <= 0) {
      return;
    }

    let data;

    if (isReply) {
      data = {
        __CSRF__: this.context.token,
        post_id: this.props.pageId,
        comment_id: this.state.commentId,
        comment_text: this.state.commentText.replace(`@${this.state.commentTargetUserName} `, ''),
        comment_for: this.state.commentTarget
      }
    }
    else {
      data = {
        __CSRF__: this.context.token,
        post_id: this.props.pageId,
        comment_text: this.state.commentText.replace(`@${this.state.commentTargetUserName} `, ''),
      }
    }

    $.ajax({
      url: '/home/post/comment',
      method: 'post',
      data: data,
      success: (data) => {
        if (data.errno === 0) {
          this.props.refreshComment(this.props.pageId);
          this.setState({
            commentText: '',
            commentTarget: null
          });
        }
      }
    })
  }

  render() {

    let comments = _.cloneDeep(this.props.comment);
    let submitButton;

    if (this.state.buttonDisable) {
      submitButton = <input disabled type="submit" name="commit" value="发 表" onClick={this.onCommentSubmit.bind(this, false)}
                            className="btn btn-small btn-info"/>
    }
    else {
      submitButton = <input type="submit" name="commit" value="发 表" onClick={this.onCommentSubmit.bind(this, false)}
                            className="btn btn-small btn-info"/>
    }

    let result = _.cloneDeep(comments);

    for (let i = 0; i < comments.length; i++) {

      if (comments[i].comment_for_id > 0) {
        let rawIndex = findCommentRoot(comments, comments[i]);
        let index = _.indexOf(result, _.find(result, comments[rawIndex]))

        if (!result[index].childComment) {
          result[index].childComment = [];
        }
        result[index].childComment.push(_.cloneDeep(comments[i]));
        _.remove(result, (val) => {
          return _.isEqual(val, comments[i]);
        })
      }
    }

    let commentList = result.map((comment, index) => {
      let commentBox;

      if (this.state.commentTarget === comment.user_id && this.state.commentRow === index) {
        commentBox = <div className="comment-text">
                <textarea value={this.state.commentText}
                          onChange={this.handleTextAreaChange.bind(this)}
                />
          <input type="submit" name="commit" value="发 表" onClick={this.onCommentSubmit.bind(this, true)}
                 className="btn btn-small btn-info"/>
        </div>
      }

      let childComment;

      if (comment.childComment) {
        childComment = comment.childComment.map((con, con_index) => {
          return (
            <div key={con_index} className="child-comment">
              <p>
                <a>{con.name}</a>
                ：
                <a>@{con.comment_for_name}</a>
                {con.comment_content}
              </p>
              <div className="child-comment-footer">
                <span className="reply-time">{con.comment_time}</span>
              </div>
              <a className="reply"
                 onClick={this.handleReply.bind(this, con.comment_id, con.user_id, con.name, index)}>回复</a>
            </div>
          )
        })
      }


      return (
        <div className="note-comment clearfix" key={index}>
          <div className="content">
            <div className="meta-top">
              <a className="avatar">
                <img
                  src={image}
                  alt="100"/>
              </a>
              <p><a className="author-name">{comment.name}</a></p>
                <span className="reply-time">
                  <small>{index + 1} 楼 · </small>
                  <span >{comment.comment_time}</span>
                </span>
            </div>
            <p>
              {comment.comment_content}
            </p>
            <div className="comment-footer">
              <a className="reply"
                 onClick={this.handleReply.bind(this, comment.comment_id, comment.user_id, comment.name, index)}>回复</a>
            </div>
            <div className="child-comment-list">
              {childComment}
            </div>
            {commentBox}
          </div>
        </div>
      )
    });

    return (
      <div className="_namespace">
        <div className="comment-head clearfix">
          <span>{comments.length}条评论</span>
          <a className="goto-comment pull-right" onClick={this.scrollTopSubmit.bind(this)}><i className="fa fa-pencil"/>添加新评论</a>
        </div>
        <div className="comment-list">
          {commentList}
        </div>
        <div className="comment-text" ref="comment">
                <textarea value={this.state.commentText}
                          onChange={this.handleTextAreaChange.bind(this)}
                />
          {submitButton}
        </div>
      </div>
    )
  }
}

Comment.contextTypes = {
  token: React.PropTypes.string
}