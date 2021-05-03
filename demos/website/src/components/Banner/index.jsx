/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-12-06 20:33
 */
import React, { Component } from 'react'
import './banner.scss'
import { initAnimation } from './animate'

class Banner extends Component {
  componentDidMount() {
    initAnimation('.banner-wrapper')
  }

  render() {
    return <div className="banner-wrapper">
      <h1>CAPRICORN<span>CD</span></h1>
      <p>A developer who likes to write code</p>
    </div>
  }
}

export default Banner
