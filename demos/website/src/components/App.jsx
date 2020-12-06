/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-10-30 17:27
 */
import React, { Component } from 'react'
import { isMacOS } from '~/assets/js'
import Nav from './Nav/index'
import Banner from './Banner'
import GitHub from './GitHub'
import Footer from './Foot'

class App extends Component {
  componentDidMount() {
    if (isMacOS()) {
      const body = document.querySelector('body')
      const classNames = body.className.split(/\s/).filter(s => !!s)
      classNames.push('is-mac')
      body.className = classNames.join(' ')
    }
  }

  render() {
    return <>
      <Nav/>
      <Banner/>
      <GitHub/>
      <Footer/>
    </>
  }
}

export default App
