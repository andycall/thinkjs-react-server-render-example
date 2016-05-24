import React from 'react'
import Navigator from '../components/navigator/index'
import ContentContainer from '../components/contentContainer/index'
import LeftImage from '../components/leftImage/index'
import UserMenu from '../components/usermenu/index'
import PageList from '../components/pageList/index'
import $ from 'jquery'

require('./index.scss');

export default class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      articleList: []
    }
  }


  componentDidMount () {
    if (!this.context.articleList) {
      $.ajax({
        url: '/home/index/article',
        method: 'get',
        data: {
          __CSRF__: this.context.token
        },
        success: (response) => {
          this.setState({
            articleList: response.data
          })
        }
      })
    }
    else {
      this.setState({
        articleList: this.context.articleList.data
      })
    }
  }


  render() {

    return (
      <div className="_namespace">
        <ContentContainer>
          <Navigator />
          <LeftImage />
          <UserMenu />
          <div className="rightContent">
            <PageList articleList={this.state.articleList} />
          </div>
        </ContentContainer>
      </div>
    )
  }
}

Home.contextTypes = {
  articleList: React.PropTypes.object,
  token: React.PropTypes.string
}