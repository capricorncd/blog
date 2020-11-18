/**
 * Created by Capricorncd.
 * Date: 2019/02/14 13:07
 * https://github.com/capricorncd
 */
import React from 'react'
import './style.less'
import ReactDoc from '../../components/react-doc/index'

// SyntheticEvent
// https://reactjs.org/docs/events.html
class SyntheticEvent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      current: ''
    }
    this.docClick = this._handleDocClick.bind(this)
  }

  componentWillMount () {
    document.addEventListener('click', this.docClick)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.docClick)
  }

  _handleDocClick () {
    if (!this.state.visible) return
    // console.error('handleDocClick')
    this.setState({
      visible: false
    })
  }

  /**
   * 点击菜单列表
   * @param item
   * @param e 合成事件synthetic event
   */
  handleLiClick (item, e) {
    console.log(e)
    this.setState({
      current: item,
      visible: false
    })
    // 合成事件 的event对象只在当前 event loop 有效
    setTimeout(_ => {
      // e 对象属性全被重置为了 null
      console.log('异步输出event', e)
      console.log(e.target) // null
    }, 0)
  }

  handleBtnClick (e) {
    // 阻止事件冒泡，触发document.onclick
    e.nativeEvent.stopImmediatePropagation()
    // 改变状态
    this.setState({
      visible: !this.state.visible
    })
  }

  render () {
    // 生成子菜单
    let arr = [
      'menu01',
      'menu02',
      'menu03',
      'menu04',
      'menu05'
    ]
    let lis = []
    arr.forEach((item, index) => {
      lis.push(<li key={ index } onClick={ this.handleLiClick.bind(this, item) }>{ item }</li>)
    })
    // 显示隐藏子菜单控制
    let show
    return (
      <div className="rt-events-component">
        <h3 className="column-title">{ this.props.name }</h3>
        <button className="btn" onClick={ this.handleBtnClick.bind(this) }>显示隐藏菜单</button>
        <div style={{paddingTop: '10px'}}>已选中子菜单：{ this.state.current }</div>
        <div style={{paddingTop: '10px'}}>点击页面空白处，隐藏菜单</div>
        <ul style={{display: this.state.visible ? '' : 'none'}}>{ lis }</ul>
        <ReactDoc
          title="Handling Events"
          url="https://reactjs.org/docs/handling-events.html"/>
        <ReactDoc
          title="SyntheticEvent"
          url="https://reactjs.org/docs/events.html"/>
      </div>
    )
  }
}

export default SyntheticEvent
