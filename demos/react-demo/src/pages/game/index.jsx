/**
 * Created by Capricorncd.
 * Date: 2019/02/13 17:44
 * https://github.com/capricorncd
 */
import React, { Component } from 'react'
import Board from './board'
import ReactDoc from '../../components/react-doc/index'
import './style.less'

class Game extends Component {
  constructor() {
    super()
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true
    }
  }

  render() {
    return (
      <div className="game">
        <h3 className="column-title">{ this.props.name }</h3>
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
        <ReactDoc
          title="Tutorial: Intro to React"
          url="https://reactjs.org/tutorial/tutorial.html"/>
      </div>
    );
  }
}

export default Game
