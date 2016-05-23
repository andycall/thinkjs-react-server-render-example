import React from 'react'
import ToolTip from 'rc-tooltip'

import { RichUtils } from 'draft-js'

import './index.scss'

export default class Bold extends React.Component {
  constructor (props) {
    super(props)
  }

  handleClick () {
    this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'));
  }

  render () {
    return (
      <li className="_namespace">
        <ToolTip
          placement="top"
          mouseEnterDelay={0}
          overlay={'粗体'}
          animation="zoom"
        >
          <a className="fa fa-bold" onClick={this.handleClick.bind(this)}>
          </a>
        </ToolTip>
      </li>
    )
  }
}