/**
 * Created by Capricorncd.
 * Date: 2019/02/13 16:15
 * https://github.com/capricorncd
 */
import React from 'react'
import Waterfall from '../../components/waterfall/index'
// Components
import NavBar from '../../components/nav-bar/index'
// Pages
import Game from '../game/index'
import DomElement from '../dom-element/index'
import Lifecycle from '../lifecycle/index'
import SyntheticEvent from '../events/index'
import DomOperate from '../dom-operate/index'
import Communication from '../component-communication/index'
import CommunicationOther from '../component-communication/other'
import FluxDemo from '../flux/index'
import Form from '../form/index'
import './style.less'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const $wrapper = this.refs.wrapper
    const waterfall = new Waterfall({
      wrapper: $wrapper,
      itemSelector: '.child-item',
      gutter: 30,
      itemWidth: 280
    })
    let $childs = $wrapper.querySelectorAll('.child-item')
    waterfall.setData(Array.prototype.slice.apply($childs))
  }

  render () {
    let components = [
      {
        name: '井字棋',
        cmp: Game
      },
      {
        name: 'DOM Elements',
        cmp: DomElement
      },
      {
        name: 'Lifecycle',
        cmp: Lifecycle
      },
      {
        name: '事件处理',
        cmp: SyntheticEvent
      },
      {
        name: 'DOM 操作',
        cmp: DomOperate
      },
      {
        name: '组件间通讯',
        cmp: Communication
      },
      {
        name: '非父子组件通讯',
        cmp: CommunicationOther
      },
      {
        name: 'Flux',
        cmp: FluxDemo
      },
      {
        name: 'Form 表单',
        cmp: Form
      }
    ]
    return (
      <div className="home-container">
        <NavBar name="React-Demos"/>
        <div ref="wrapper" className="home-item-wrapper">
          {
            components.map((item, index) => {
              return (
                <div className="child-item" key={ index }>
                  <item.cmp name={ index + 1 + ' ' + item.name }/>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Home
