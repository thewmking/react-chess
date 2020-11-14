import React from 'react';

// components
import Board from './Board.js'
import King from './pieces/King.js';
import Queen from './pieces/Queen.js';
import Bishop from './pieces/Bishop.js';
import Knight from './pieces/Knight.js';
import Rook from './pieces/Rook.js';
import Pawn from './pieces/Pawn.js';

// moves
import {kingMoves} from '../moves/kingMoves.js'
import {queenMoves} from '../moves/queenMoves.js'
import {bishopMoves} from '../moves/bishopMoves.js'
import {knightMoves} from '../moves/knightMoves.js'
import {rookMoves} from '../moves/rookMoves.js'
import {pawnMoves} from '../moves/pawnMoves.js'


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

  handleClick(selectedSquare, dest) {
    console.log('Handling click for square: [' + dest[0] + ', ' + dest[1] + ']');
    console.log(selectedSquare)
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
      const origin = this.state.activeSquare.coordinates
      // reset activeSquare if user selects current activeSquare
      if (origin.toString() === dest.toString()) {
        this.setState({
          activeSquare: null
        })
        return;
      }

      // move selected piece if selection is valid move
      if (this.validMove(squareArray, selectedSquare, dest, currentColor, origin)) {
        squareArray[dest[0]][dest[1]] = this.state.activeSquare.value
        squareArray[origin[0]][origin[1]] = null
        this.setState({
          activeSquare: null,
          whiteIsNext: !this.state.whiteIsNext
        })
      } else {
        alert('Invalid move.')
        return;
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
      if (squareArray[dest[0]][dest[1]] && (currentColor === selectedSquare.props.color)) {
        this.setState({
          activeSquare: { value: selectedSquare, coordinates: dest }
        })
      } else {
        alert('Select a ' + currentColor + ' piece.')
        return;
      }
    }
  }

  validMove(squareArray, selectedSquare, dest, currentColor, origin) {
    // return true if next selection is in available moves && is empty or is enemy piece
    const availableMoves = this.moves(squareArray, origin, dest, currentColor, selectedSquare)
    const cellValid = (!squareArray[dest[0]][dest[1]] || (currentColor !== selectedSquare.props.color))
    if (availableMoves.includes(dest.toString()) && cellValid) {
      return true
    } else {
      return false
    }
  }

  moves(squareArray, origin, dest, currentColor, selectedSquare) {
    const activeSquare = this.state.activeSquare
    const row          = origin[0]
    const column       = origin[1]
    let moves          = []
    const range        = [...Array(8).keys()]
    console.log('activeSquare:')
    console.log(activeSquare)
    if (activeSquare.value.type.name.toString() === 'King') {
      moves = kingMoves(row, column, range)
    }
    if (activeSquare.value.type.name.toString() === 'Queen') {
      moves = queenMoves(row, column, range)
    }
    if (activeSquare.value.type.name.toString() === 'Bishop') {
      moves = bishopMoves(row, column, range)
    }
    if (activeSquare.value.type.name.toString() === 'Knight') {
      moves = knightMoves(row, column, range)
    }
    if (activeSquare.value.type.name.toString() === 'Rook') {
      moves = rookMoves(row, column, range)
    }
    if (activeSquare.value.type.name.toString() === 'Pawn') {
      moves = pawnMoves(activeSquare, row, column, dest, squareArray, currentColor, selectedSquare, range)
    }
    return moves.map(x => x.toString());
  }

  // pawnMoves(activeSquare, row, column, dest, squareArray, currentColor, selectedSquare, range) {
  //   const moves = []
  //   if (activeSquare.value.props.color === 'white') {
  //
  //     // option to advance 2 spaces on first move
  //     if (row === 6) { moves.push([row - 2, column]) }
  //
  //     // standard 1 space advance
  //     if (range.includes(row - 1) && !squareArray[dest[0]][dest[1]]) { moves.push([row - 1, column]) }
  //
  //     // diagonal capture
  //     if (squareArray[dest[0]][dest[1]] && selectedSquare.props.color === 'black') { // if selected square has value && is other color
  //       if ((dest[0] === row - 1) && (dest[1] === column - 1)) {
  //          moves.push([row - 1, column - 1])
  //       }
  //       if ((dest[0] === row - 1) && (dest[1] === column + 1)) {
  //          moves.push([row - 1, column + 1])
  //       }
  //     }
  //   } else {
  //     // option to advance 2 spaces on first move
  //     if (row === 1) { moves.push([row + 2, column]) }
  //
  //     // standard 1 space advance
  //     if (range.includes(row + 1) && !squareArray[dest[0]][dest[1]]) { moves.push([row + 1, column]) }
  //
  //     // diagonal capture
  //     if (squareArray[dest[0]][dest[1]] && selectedSquare.props.color === 'white') { // if selected square has value && is other color
  //       if ((dest[0] === row + 1) && (dest[1] === column - 1)) {
  //          moves.push([row + 1, column - 1])
  //       }
  //       if ((dest[0] === row + 1) && (dest[1] === column + 1)) {
  //          moves.push([row + 1, column + 1])
  //       }
  //     }
  //   }
  //   return moves
  // }

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
            onClick={(selectedSquare, dest) => this.handleClick(selectedSquare, dest)}
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
