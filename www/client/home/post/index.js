import React from 'react'
import Navigator from '../components/navigator/index'
import ContentContainer from '../components/contentContainer/index'
import LeftImage from '../components/leftImage/index'
import UserMenu from '../components/usermenu/index'

export default class Post extends React.Component {
  render () {
    return (
      <div className="_namespace">
        <ContentContainer>
          <Navigator />
          <LeftImage />
          <UserMenu />
          <div className="rightContent">
            1234
          </div>
        </ContentContainer>
      </div>
    )
  }
}