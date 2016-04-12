import React from 'react'
import logo from './logo_dark.png'

import './index.scss'

export default class Navigator extends React.Component {
  render() {
    return (
      <div id="header">
        <div className="container">
          <img src={logo}/>
          <div className="navbar-collapse pull-right nav-main-collapse collapse">
            <nav className="nav-main">
              <ul id="topMain" className="nav nav-pills nav-main nav-onepage">
                <li className="active">
                  <a href="#slider">
                    HOME
                  </a>
                </li>
                <li className="dropdown">
                  <a className="dropdown-toggle" href="#">
                    ABOUT
                  </a>
                  <ul className="dropdown-menu">
                    <li className=""><a href="#about">ABOUT SMARTY</a></li>
                    <li className=""><a href="#skills">OUR SKILLS</a></li>
                  </ul>
                </li>
                <li className="">
                  <a href="#work">
                    WORK
                  </a>
                </li>
                <li className="">
                  <a href="#team">
                    TEAM
                  </a>
                </li>
                <li className="">
                  <a href="#services">
                    SERVICES
                  </a>
                </li>
                <li className="">
                  <a href="#pricing">
                    PRICING
                  </a>
                </li>
                <li className="">
                  <a href="#testimonials">
                    TESTIMONIALS
                  </a>
                </li>
                <li>
                  <a className="external" href="blog-default-aside-left.html">
                    BLOG
                  </a>
                </li>
                <li className="">
                  <a href="#contact">
                    CONTACT
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}