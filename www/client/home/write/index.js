import React from 'react'

import Navigator from '../components/navigator/index'
import ArticleList from '../components/articleList/index'
import Editor from '../components/editor/index'

import './index.scss'

export default class Write extends React.Component {
  render () {
    return (
      <div className="_namespace">
        <Navigator />
        <div className="rightContainer">
          <ArticleList style={{ width: '25%'}} />
          <Editor style={{width: '74.333%'}} />
        </div>
      </div>
    )
  }
}