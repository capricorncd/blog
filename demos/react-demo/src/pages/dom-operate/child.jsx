/**
 * Created by Capricorncd.
 * Date: 2019/02/14 17:22
 * https://github.com/capricorncd
 */
import React from 'react'
import ReactDoc from "../../components/react-doc/index"

class ChildComp extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div className="mt-1" style={{ border: '1px solid green', padding: '5px 10px', color: 'green' }}>
        <ReactDoc url="https://reactjs.org/docs/react-api.html#reactchildren"/>
        { this.props.children }
      </div>
    )
  }
}

export default ChildComp
