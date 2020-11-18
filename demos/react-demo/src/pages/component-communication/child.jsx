/**
 * Created by Capricorncd.
 * Date: 2019/02/15 10:56
 * https://github.com/capricorncd
 */
import React from 'react'

export default class Child extends React.Component {
  constructor (props) {
    super(props)
  }

  sendToParent (msg) {
    this.props.emit('From Child: ' + msg)
  }

  render () {
    return (
      <div className="mt-1">
        <div>
          <small className="color-main"># 子组件</small>
        </div>
        <small>
          <p>收到父级的通知：</p>
          <p className="ell" style={ this.props.style }>{ this.props.msg }</p>
        </small>
        <button
          className="btn"
          onClick={this.sendToParent.bind(this, new Date().toLocaleString())}>向父组件发送通知</button>
      </div>
    )
  }
}
