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

// paths
import {rookPath} from '../paths/rookPath.js'
import {bishopPath} from '../paths/bishopPath.js'
import {queenPath} from '../paths/queenPath.js'



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
      const activeSquare = this.state.activeSquare
      const origin = activeSquare.coordinates
      // reset activeSquare if user selects current activeSquare
      if (origin.toString() === dest.toString()) {
        this.setState({
          activeSquare: null
        })
        return;
      }

      // move selected piece if selection is valid move
      if (this.validMove(squareArray, origin, dest, currentColor, selectedSquare, activeSquare)) {
        squareArray[dest[0]][dest[1]] = activeSquare.value
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

  validMove(squareArray, origin, dest, currentColor, selectedSquare, activeSquare) {
    const availableMoves = this.moves(squareArray, origin, dest, currentColor, selectedSquare, activeSquare) // get available moves
    const cellValid = (!squareArray[dest[0]][dest[1]] || (currentColor !== selectedSquare.props.color)) // is empty or is enemy piece
    const pathEmpty = this.getPathValues(squareArray, selectedSquare, origin, dest, activeSquare).filter(Boolean).length === 0
    // todo: remove moves that would put king in check
    if (availableMoves.includes(dest.toString()) && cellValid && pathEmpty) {
      return true
    } else {
      return false
    }
  }

  moves(squareArray, origin, dest, currentColor, selectedSquare, activeSquare) {
    const row    = origin[0]
    const column = origin[1]
    let   moves  = []
    const range  = [...Array(8).keys()]
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

  getPathValues(squareArray, selectedSquare, origin, dest, activeSquare) {
    let pathSquares = []
    let pathValues
    const range  = [...Array(8).keys()]
    let [row, column] = [origin[0], origin[1]]
    let [x, y] = [dest[0] - row, dest[1] - column]
    if (activeSquare.value.type.name.toString() === 'Rook') {
      pathSquares = rookPath(row, column, x, y, range)
    }
    if (activeSquare.value.type.name.toString() === 'Bishop') {
      pathSquares = bishopPath(row, column, x, y, range)
    }
    if (activeSquare.value.type.name.toString() === 'Queen') {
      pathSquares = queenPath(row, column, x, y, range)
    }
    pathValues = pathSquares.map(square => {
      return squareArray[square[0]][square[1]]
    })
    console.log('pathValues')
    console.log(pathValues)
    return pathValues
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
