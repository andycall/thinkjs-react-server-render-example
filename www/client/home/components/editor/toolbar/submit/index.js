import React from 'react'
import ToolTip from 'rc-tooltip'
import { convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import $ from 'jquery'

import './index.scss'

export default class Submit extends React.Component {

  handleClick () {
    let contentState = this.props.editorState.getCurrentContent();

    this.props.onSubmit(stateToHTML(contentState));
  }

  render () {
    return (
      <li className="_namespace" >
        <ToolTip
          placement="top"
          mouseEnterDelay={0}
          overlay={'发布文章'}
          animation="zoom"
        >
        <a className="fa fa-mail-forward" onClick={this.handleClick.bind(this)}>发布文章</a>
        </ToolTip>
      </li>
    )
  }
}