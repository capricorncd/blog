/**
 * Created by Capricorncd.
 * Date: 2019/02/13 16:15
 * https://github.com/capricorncd
 */
import React from 'react'
import './style.less'
import { pages } from '../../config/index'

class NavBar extends React.Component {
  constructor (props) {
    super(props)
    // this.handleLogoClick = this.handleLogoClick.bind(this)
  }

  // IDE: Method can be static
  static handleLogoClick () {
    window.open('https://github.com/capricorncd/react-demo')
  }

  render () {
    return (
      <nav className="nav-bar-component">
        <div className="logo cur" onClick={ NavBar.handleLogoClick }>
          <i/>
          <span className="text">{ this.props.name || 'React-Demo' }</span>
        </div>
        <ul>
          <li>{ pages.home.name }</li>
        </ul>
        <div className="r-wrapper">
          <a
            href="https://reactjs.org/"
            className="github"
            target="_blank">React</a>
          <a
            href="https://github.com/facebook/react/"
            className="github"
            target="_blank">GitHub</a>
        </div>
      </nav>
    )
  }
}

export default NavBar
