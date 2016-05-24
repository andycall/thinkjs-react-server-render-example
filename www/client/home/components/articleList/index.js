import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { browserHistory } from 'react-router'

import './index.scss'

export default class ArticleList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      height: 1000
    }
  }

  resizeHeight () {
    let height = window.innerHeight;

    this.setState({
      height: height
    })
  }

  switchPage (id) {
    browserHistory.push({
      pathname: '/home/write',
      query: {
        page_id: id
      }
    })
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeHeight.bind(this));
    this.setState({
      height: window.innerHeight
    })
  }

  componentWillUnMount () {
    window.removeEventListener('resize', this.resizeHeight.bind(this));
  }

  render() {
    let postList = this.context.postList;

    let { count, data } = postList;
    let pageId = parseInt(this.props.pageId);

    let height = this.state.height;
    let style = _.assign(_.cloneDeep(this.props.style), {height: height} );

    let pages = data.map((val, index) => {

      let activeClassName = classNames({
        'one-note': true,
        'active': val.article_id === pageId
      })

      return (
        <li className={activeClassName} key={index} onClick={this.switchPage.bind(this, val.article_id)}>
          <i className="icon icon-note note-icon stop-share"></i>
          <div className="abbreviate" dangerouslySetInnerHTML={{__html: val.article_content}} />
          <a href="javascript:void(0)" data-type="edit" className="note-link title">{val.article_title}</a>
        </li>
      )
    })

    return (
      <div className="_namespace" style={style}>
        <div id="new-note" className="new-note">
          <a href="javascript:void(0)" onClick={this.props.newPost} className="new-note-link">
            <i className="icon fa fa-pencil" />
            <span className="win-text">+新建文章</span>
          </a>
          <span className="post-count">文章总数 : {count}</span>
        </div>
        <ul className="nav-lists">
          {pages}
        </ul>
      </div>
    )
  }
}

ArticleList.contextTypes = {
  postList: React.PropTypes.object
}