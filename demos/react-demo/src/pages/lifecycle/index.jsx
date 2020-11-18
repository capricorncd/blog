/**
 * Created by Capricorncd.
 * Date: 2019/02/14 10:44
 * https://github.com/capricorncd
 */
import React, { Component } from 'react'
import ReactDoc from "../../components/react-doc/index";

function log(a) {
  console.error('=> ' + a)
}

// https://reactjs.org/docs/state-and-lifecycle.html
class Lifecycle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date()
    }
    log('constructor')
  }

  updateDate () {
    this.setState({
      date: new Date()
    })
  }

  componentWillMount () {
    log('componentWillMount')
  }

  componentDidMount () {
    log('componentDidMount')
  }

  componentWillReceiveProps () {
    log('componentWillReceiveProps')
  }

  shouldComponentUpdate (nextProps, nextState) {
    log('shouldComponentUpdate')
    return true
  }

  componentWillUpdate () {
    log('componentWillUpdate')
  }

  componentDidUpdate () {
    log('componentDidUpdate')
  }

  componentWillUnmount () {
    log('componentWillUnmount')
  }

  render() {
    let time = this.state.date.toLocaleTimeString()
    log('render ' + time)
    return (
      <div>
        <h3 className="column-title">{ this.props.name }</h3>
        <div>It is {time}</div>
        <div className="color-main" style={{margin: '10px 0'}}>请打开控制台，查看生命周期函数输出顺序</div>
        <button className="btn" onClick={this.updateDate.bind(this)}>更新时间</button>
        <ReactDoc
          title="State and Lifecycle"
          url="https://reactjs.org/docs/state-and-lifecycle.html"/>
      </div>
    )
  }
}

export default Lifecycle
