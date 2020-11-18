/**
 * Created by Capricorncd.
 * Date: 2019/02/13 17:41
 * https://github.com/capricorncd
 */
import React from 'react'

class Square extends React.Component {
  constructor() {
    super()
    this.state = {
      value: null,
    }
  }

  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}

export default Square
