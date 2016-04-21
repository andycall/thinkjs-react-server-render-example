import React from 'react'
import {Link} from 'react-router'
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
            <p><Link to="/home/test">Go to test page</Link></p>
            <p><Link activeClassName="active" to="/admin">Go to Admin</Link></p>
          </div>
        </ContentContainer>
      </div>
    )
  }
}