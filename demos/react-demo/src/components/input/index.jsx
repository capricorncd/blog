/**
 * Created by Capricorncd.
 * Date: 2019/02/15 13:15
 * https://github.com/capricorncd
 */
import React from 'react'
import './style.less'

export default class RdInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.handleChange = this.handleChange.bind(this)
  }

  $el () {
    return this.refs.input
  }

  async handleChange (e) {
    let value = e.target.value
    await this.setState({
      value
    })
    this.props.change && this.props.change(value)
  }

  render () {
    return (
      <div className="rd-input-component">
        <input
          ref="input"
          type="text"
          value={ this.state.value }
          placeholder={ this.props.placeholder }
          onChange={ this.handleChange }/>
      </div>
    )
  }
}
