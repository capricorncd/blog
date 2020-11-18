/**
 * Created by Capricorncd.
 * Date: 2019/02/14 10:03
 * https://github.com/capricorncd
 */
import React, { Component } from 'react'
import ReactDoc from '../../components/react-doc/index'

class DomElement extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isChecked: false,
      html: {
        __html: 'HTML: First &middot; Second'
      }
    }
  }
  handleClick () {
    this.setState({isChecked: !this.state.isChecked})
  }
  render () {
    return (
      <div>
        <h3 className="column-title">{ this.props.name }</h3>
        <h3>{ this.state.isChecked ? '已' : '未' }选中</h3>
        <button className="btn" onClick={ this.handleClick.bind(this) }>toggle</button>
        <small className="block mt-1">显示Html内容</small>
        <div className="color-main mt-1" dangerouslySetInnerHTML={this.state.html}/>
        <ReactDoc
          title="DOM Elements"
          url="https://reactjs.org/docs/dom-elements.html"/>
      </div>
    )
  }
}

export default DomElement
