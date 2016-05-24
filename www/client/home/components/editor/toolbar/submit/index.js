import React from 'react'
import ToolTip from 'rc-tooltip'
import { convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import $ from 'jquery'

import './index.scss'

export default class Submit extends React.Component {

  handleClick () {
    let contentState = this.props.editorState.getCurrentContent();

    this.props.onSubmit(stateToHTML(contentState), convertToRaw(contentState));
  }

  render () {
    let buttonText = this.props.mode === 'new' ? '发布文章' : '更新文章'

    return (
      <li className="_namespace" >
        <ToolTip
          placement="top"
          mouseEnterDelay={0}
          overlay={buttonText}
          animation="zoom"
        >
        <a className="fa fa-mail-forward" onClick={this.handleClick.bind(this)}>{buttonText}</a>
        </ToolTip>
      </li>
    )
  }
}