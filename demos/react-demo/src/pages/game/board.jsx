/**
 * Created by Capricorncd.
 * Date: 2019/02/13 17:44
 * https://github.com/capricorncd
 */
import React from 'react'
import Square from './square'
import { calculateWinner } from './helper'

class Board extends React.Component {
  constructor() {
    super()
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick (i) {
    // const squares = this.state.squares.slice()
    // squares[i] = this.state.xIsNext ? 'X' : 'O'
    // this.setState({
    //   squares: squares,
    //   xIsNext: !this.state.xIsNext,
    // })
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare (i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
    // return <Square
    //   value={this.props.squares[i]}
    //   onClick={() => this.props.onClick(i)}
    // />
  }

  render () {
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

export default Board
