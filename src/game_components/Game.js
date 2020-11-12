import React from 'react';
import Board from './Board.js'
import King from './pieces/King.js';
import Queen from './pieces/Queen.js';
import Rook from './pieces/Rook.js';
import Knight from './pieces/Knight.js';
import Bishop from './pieces/Bishop.js';
import Pawn from './pieces/Pawn.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squareArray: this.defaultArray()
      }],
      stepNumber: 0,
      whiteIsNext: true,
      activeSquare: null
    }
  }

  defaultArray() {
    let array = new Array(8)
    for (let i=0; i<8; i++) {
      array[i] = [null,null,null,null,null,null,null,null]
    }

    // black pieces
    array[0][0] = <Rook color="black"/>
    array[0][1] = <Knight color="black"/>
    array[0][2] = <Bishop color="black"/>
    array[0][3] = <Queen color="black"/>
    array[0][4] = <King color="black"/>
    array[0][5] = <Bishop color="black"/>
    array[0][6] = <Knight color="black"/>
    array[0][7] = <Rook color="black"/>
    array[1] = [
      <Pawn color="black"/>,
      <Pawn color="black"/>,
      <Pawn color="black"/>,
      <Pawn color="black"/>,
      <Pawn color="black"/>,
      <Pawn color="black"/>,
      <Pawn color="black"/>,
      <Pawn color="black"/>
    ]

    // white pieces
    array[7][0] = <Rook color="white"/>
    array[7][1] = <Knight color="white"/>
    array[7][2] = <Bishop color="white"/>
    array[7][3] = <Queen color="white"/>
    array[7][4] = <King color="white"/>
    array[7][5] = <Bishop color="white"/>
    array[7][6] = <Knight color="white"/>
    array[7][7] = <Rook color="white"/>
    array[6] = [
      <Pawn color="white"/>,
      <Pawn color="white"/>,
      <Pawn color="white"/>,
      <Pawn color="white"/>,
      <Pawn color="white"/>,
      <Pawn color="white"/>,
      <Pawn color="white"/>,
      <Pawn color="white"/>
    ]

    return array
  }

  handleClick(square, rowIndex, index) {
    console.log('Handling click for square: [' + rowIndex + ', ' + index + ']');
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squareArray = current.squareArray.slice();
    const currentColor = this.state.whiteIsNext ? 'white' : 'black'
    
    // check for winner
    if (calculateWinner(squareArray)) {
      return;
    }

    // if activeSquare present
    if (this.state.activeSquare) {
      const coordinates = this.state.activeSquare.coordinates
      // reset activeSquare if user selects current activeSquare
      if (coordinates.toString() === [rowIndex, index].toString()) {
        this.setState({
          activeSquare: null
        })
      }

      // move selected piece if next selection is empty or is enemy piece
      if (!squareArray[rowIndex][index] || (currentColor !== square.props.color)) {
        squareArray[rowIndex][index] = this.state.activeSquare.value
        squareArray[coordinates[0]][coordinates[1]] = null
        this.setState({
          activeSquare: null,
          whiteIsNext: !this.state.whiteIsNext
        })
      }

      // set board history
      this.setState({
        history: history.concat([{
          squareArray: squareArray
        }]),
        stepNumber: history.length
      })
    } else {
      // set activeSquare if selected square has contents && is current user color
      if (squareArray[rowIndex][index] && (currentColor === square.props.color)) {
        this.setState({
          activeSquare: { value: square, coordinates: [rowIndex, index]}
        })
      } else {
        alert('Select a ' + currentColor + ' piece.')
        return;
      }
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      whiteIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squareArray);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Your move: ' + (this.state.whiteIsNext ? 'White' : 'Black');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squareArray={current.squareArray}
            onClick={(square, rowIndex, index) => this.handleClick(square, rowIndex, index)}
            activeSquare={this.state.activeSquare}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;

function calculateWinner(squareArray) {

  return null;
}
