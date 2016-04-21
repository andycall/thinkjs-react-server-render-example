import React from 'react'

import './index.scss'

import image from './xuryqyrvkshpgUxxAQNp.jpg'

export default class LeftImage extends React.Component {
  render() {
    return (
      <div className="_namespace">
        <div className="image" style={{
          backgroundImage: 'url('  + image + ')'
        }}></div>
        <div className="bottom-block">
          <h1>坛说</h1>
          <h3>分享知识,交流经验</h3>
          <p>一个信息分享的社区</p>
          <a className="btn btn-large btn-success" href="/writer#/">提笔写篇文章</a>
        </div>
      </div>
    )
  }
}