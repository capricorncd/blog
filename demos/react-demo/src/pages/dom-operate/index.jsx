/**
 * Created by Capricorncd.
 * Date: 2019/02/14 15:02
 * https://github.com/capricorncd
 */
import React from 'react'
import { findDOMNode } from 'react-dom'
import ReactDoc from '../../components/react-doc/index'
import ChildComp from './child'

class DomOperate extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    // findDOMNode() 不能用在无状态组件上
    const $el = findDOMNode(this)
    console.log('findDOMNode(this) =>', $el)
  }

  selectDiv (isSelected) {
    let divBorderColor = isSelected ? 'red' : '#ccc'
    const $div = this.refs.div
    $div.style.color = divBorderColor
    $div.style.borderColor = divBorderColor
  }

  render () {
    return (
      <div>
        <h3 className="column-title">{this.props.name}</h3>
        <div ref="div" style={{padding: '10px', color: '#ccc', border: '1px solid #ccc'}}>DIV[ref="div"]</div>
        <button className="btn mt-1" onClick={this.selectDiv.bind(this, true)}>选中DIV</button>
        <button className="btn cancel mt-1 ml-1" onClick={this.selectDiv.bind(this, false)}>取消选中</button>
        <ChildComp>
          Children Component
        </ChildComp>
        <ReactDoc url="http://caibaojian.com/react/dom.html"/>
      </div>
    )
  }
}

export default DomOperate
