import React from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw
} from 'draft-js';

import './index.scss'
import 'draft-js/dist/Draft.css'

import Bold from './toolbar/bold/index'
import Submit from './toolbar/submit/index'
import $ from 'jquery'

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
      height: 1000,
      title: '',
      loadEditor: false
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeHeight.bind(this));


    this.setState({
      height: window.innerHeight - 120,
      loadEditor: true
    })
  }

  componentWillUnMount () {
    window.removeEventListener('resize', this.resizeHeight.bind(this));
  }

  resizeHeight () {
    let height = window.innerHeight - 120;

    this.setState({
      height: height
    })
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  handleInputChange (e) {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit (content) {
    $.ajax({
      url: '/home/write/submit',
      method: 'POST',
      data: {
        title: this.state.title,
        content: content,
        __CSRF__: this.context.token
      },
      success: (response) => {
        console.log(response);
      }
    })
  }

  render() {

    const {editorState} = this.state;

    let editor;

    if (this.state.loadEditor) {
      editor =  <Editor
        editorState={editorState}
        onChange={this.onChange.bind(this)}
        handleKeyCommand={this.handleKeyCommand}
      />
    }

    return (
      <div className="_namespace" {...this.props}>
        <input className="title mousetrap" value={this.state.title} onChange={this.handleInputChange.bind(this)} name="note_title" id="note_title" type="text" placeholder="无标题文章" />
        <div className="editor">
          <ul className="toolbar">
            <Bold onChange={this.onChange} editorState={this.state.editorState} />
            <Submit onSubmit={this.handleSubmit.bind(this)} editorState={this.state.editorState} />
          </ul>
          <div className="editor-wrapper" style={{
              height: this.state.height
            }}>
            {editor}
          </div>
        </div>
      </div>
    );
  }
}

MyEditor.contextTypes = {
  token: React.PropTypes.string
}