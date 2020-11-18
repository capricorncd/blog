/**
 * Created by Capricorncd.
 * Date: 2019/02/15 14:05
 * https://github.com/capricorncd
 */
import React from 'react'
import ReactDoc from '../../components/react-doc/index'
import Card from '../../components/card/index'

class FluxDemo extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h3 className="column-title">{ this.props.name }</h3>
        <Card title="单向数据流">
          Action -> Dispatcher -> Store -> View
        </Card>
        <Card small="整个流程如下:" color="#ccc">
          <ul>
            <li>首先要有 action，通过定义一些 action creator 方法根据需要创建 Action 提供给 dispatcher</li>
            <li>View 层通过用户交互（比如 onClick）会触发 Action</li>
            <li>Dispatcher 会分发触发的 Action 给所有注册的 Store 的回调函数</li>
            <li>Store 回调函数根据接收的 Action 更新自身数据之后会触发一个 change 事件通知 View 数据更改了</li>
            <li>View 会监听这个 change 事件，拿到对应的新数据并调用 setState 更新组件 UI</li>
          </ul>
        </Card>
        <ReactDoc
          title="GitHub"
          url="https://github.com/facebook/flux"/>
        <ReactDoc url="https://facebook.github.io/flux/"/>
      </div>
    )
  }
}

export default FluxDemo
