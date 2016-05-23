import React from 'react'
import _ from 'lodash'

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
    let height = this.state.height;
    let style = _.assign(_.cloneDeep(this.props.style), {height: height} );

    return (
      <div className="_namespace" style={style}>
        <div id="new-note" className="new-note">
          <a href="javascript:void(0)" data-action="create-note" className="new-note-link">
            <i className="icon fa fa-pencil" />
            <span className="win-text">+新建文章</span>
          </a>
        </div>
        <ul className="nav-lists">
          <li className="one-note active">
            <i className="icon icon-note note-icon stop-share"></i>
            <p className="abbreviate">111</p>
            <a href="javascript:void(0)" data-type="edit" className="note-link title">this is title</a>
          </li>
          <li className="one-note">
            <i className="icon icon-note note-icon stop-share"></i>
            <p className="abbreviate">xxxx</p>
            <a href="javascript:void(0)" data-type="edit" className="note-link title">this is xxx</a>
          </li>
        </ul>
      </div>
    )
  }
}