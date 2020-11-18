/**
 * Created by Capricorncd.
 * Date: 2019/02/15 17:47
 * https://github.com/capricorncd
 */
import React from 'react'
import Card from '../../components/card/index'
import './style.less'

class FormDemo extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3 className="column-title">{ this.props.name }</h3>
        <Card color="#ccc" title="状态属性">
          <ul>
            <li>value，对应 input 和 textarea</li>
            <li>checked，对应类型为 checkbox 和 radio 的input</li>
            <li>selected，对应 option</li>
          </ul>
        </Card>
      </div>
    )
  }
}

export default FormDemo
