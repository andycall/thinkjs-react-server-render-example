import React from 'react'
import Navigator from '../components/navigator/index'
import ContentContainer from '../components/contentContainer/index'
import LeftImage from '../components/leftImage/index'
import UserMenu from '../components/usermenu/index'

require('./index.scss');

export default class Home extends React.Component {
  render() {

    return (
      <div className="_namespace">
        <ContentContainer>
          <Navigator />
          <LeftImage />
          <UserMenu />
          <div className="rightContent">
            The login page
          </div>
        </ContentContainer>
      </div>
    )
  }
}