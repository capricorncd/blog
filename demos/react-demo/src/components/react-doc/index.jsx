/**
 * Created by Capricorncd.
 * Date: 2019/02/14 14:42
 * https://github.com/capricorncd
 */
import React from 'react'
import './style.less'

class ReactDoc extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    let url = this.props.url
    let title = this.props.title || url
    return (
      <a
        href={ url }
        target="_blank"
        className="react-doc-compoent">{ title }</a>
    )
  }
}

export default ReactDoc
