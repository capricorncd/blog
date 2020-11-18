/**
 * Created by Capricorncd.
 * Date: 2019/02/15 16:34
 * https://github.com/capricorncd
 */
import React from 'react'
import './style.less'

class Card extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    // 标题
    let title = this.props.title
    // 副标题
    let smallTitle = this.props.small
    // 内容样式
    let className = ['content mt-1']
    // 禁止换行
    if (this.props.nowrap) {
      className.push('nowrap')
    }
    return (
      <div className="rd-card-component">
        {
          title && (<small className="color-main"># { title }</small>)
        }
        <small>
          {
            smallTitle && (<div className="s-title mt-1">{ smallTitle }</div>)
          }
          <div className={ className.join(' ') } style={{color: this.props.color}}>{ this.props.children }</div>
        </small>
      </div>
    )
  }
}

export default Card
