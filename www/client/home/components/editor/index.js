import React from 'react'
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js';
import _ from 'lodash'

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
      loadEditor: false,
      mode: 'new'
    };
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount () {
    window.addEventListener('resize', this.resizeHeight.bind(this));

    this.getEditStateFromPageId();

    this.setState({
      height: window.innerHeight - 120,
      loadEditor: true
    })
  }

  componentWillReceiveProps (nextProps) {
    this.getEditStateFromPageId(nextProps.pageId);
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

  getEditStateFromPageId (pageId) {
    let postList = this.props.postList;
    if (_.isEmpty(postList)) {
      return;
    }

    pageId = (pageId || pageId === 0) || this.props.pageId;
    let postData = postList.data.filter((val) => {
      return val.article_id === parseInt(pageId);
    });

    if (postData.length < 1) {
      return this.setState({
        editorState: EditorState.createEmpty(),
        title: '',
        mode: 'new'
      })
    }

    let rawContentState = JSON.parse(postData[0].article_obj);
    let contentState = convertFromRaw(rawContentState);

    this.setState({
      editorState: EditorState.createWithContent(contentState),
      title: postData[0].article_title,
      mode: 'update'
    })
  }

  handleSubmit (content, contentObj) {
    $.ajax({
      url: '/home/write/submit',
      method: 'POST',
      data: {
        id: this.props.pageId,
        title: this.state.title,
        content: content,
        obj: JSON.stringify(contentObj),
        mode: this.state.mode,
        __CSRF__: this.context.token
      },
      success: (response) => {
        if (response.errno === 0) {
          location.reload();
        }
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
            <Submit mode={this.state.mode} onSubmit={this.handleSubmit.bind(this)} editorState={this.state.editorState} />
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
  token: React.PropTypes.string,
}