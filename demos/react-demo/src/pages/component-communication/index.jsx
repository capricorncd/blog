/**
 * Created by Capricorncd.
 * Date: 2019/02/15 10:51
 * https://github.com/capricorncd
 */
import React from 'react'
// import { findDOMNode } from 'react-dom'
import Child from './child'
import broadcast from './broadcast'
import RdInput from '../../components/input/index'
import Card from '../../components/card/index'

class Communication extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '-',
      msgFromChild: '-',
      inputValue: ''
    }
    this.inputChange = this.inputChange.bind(this)
  }

  sendMsg () {
    this.setState({
      message: 'From Parent: ' + new Date().toLocaleString()
    })
  }

  /**
   * 获取子组件发送的信息
   * @param msg
   */
  getMsgFromChild (msg) {
    this.setState({
      msgFromChild: msg
    })
  }

  /**
   * 向其他非父子组件发送信息
   */
  sendToOther () {
    if (!this.state.inputValue) {
      alert('发送的内容为空！')
      // 获取input元素
      const $input = this.refs.input.$el()
      $input.focus()
      return
    }
    broadcast.emit('msg-from-index', this.state.inputValue)
  }

  inputChange (value) {
    this.setState({
      inputValue: value
    })
  }

  render () {
    return (
      <div>
        <h3 className="column-title">{ this.props.name }</h3>
        <Card className="mt-1" title="父组件" small="子组件发来的内容：" nowrap>
          { this.state.msgFromChild }
        </Card>
        <button
          className="btn mt-1"
          onClick={ this.sendMsg.bind(this) }>父组件向子组件发送通知</button>
        <Child
          className="mt-1"
          msg={ this.state.message }
          emit={ this.getMsgFromChild.bind(this) }
          style={ style() }/>
        <div className="mt-1">
          <small className="color-main"># 非父子组件通讯</small>
        </div>
        <div className="mt-1">
          <RdInput
            ref="input"
            value={ this.state.inputValue }
            placeholder="在此输入发送内容"
            change={ this.inputChange }/>
        </div>
        <button
          className="btn cancel mt-1"
          onClick={ this.sendToOther.bind(this) }>向其他组件发送信息</button>
      </div>
    )
  }
}

function style () {
  return {
    height: '20px',
    lineHeight: '20px',
    background: 'rgba(0, 0, 0, .2)',
    borderRadius: '4px',
    padding: '10px',
    overflow: 'hidden',
    color: 'yellow'
  }
}

export default Communication
