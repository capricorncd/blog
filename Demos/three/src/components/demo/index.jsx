/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-09-13 21:33
 */
import React, { Component } from 'react'
import { demo } from './demo'
import './index.scss'

class Demo extends Component {
  constructor(props) {
    super(props)
    this.el = React.createRef()
  }

  componentDidMount() {
    const el = this.el.current
    demo(el, el.offsetWidth, el.offsetHeight)
  }

  render() {
    return <div className="box-demo-wrapper" ref={this.el}></div>
  }
}

export default Demo
