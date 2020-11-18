/**
 * Created by Capricorncd.
 * Date: 2019/02/15 11:32
 * https://github.com/capricorncd
 */
import React from 'react'
import broadcast from './broadcast'
import Card from '../../components/card/index'

class Other extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '-'
    }
  }

  componentWillMount () {
    broadcast.on('msg-from-index', message => {
      this.setState({
        message
      })
    })
  }

  componentWillUnmount () {
    broadcast.off('msg-from-index')
  }

  render () {
    return (
      <div>
        <h3 className="column-title">{ this.props.name }</h3>
        <Card small="其他组件发来的内容：" nowrap>
          { this.state.message }
        </Card>
      </div>
    )
  }
}

export default Other
