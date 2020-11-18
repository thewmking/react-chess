export const pawnMoves = (activeSquare, row, column, dest, squareArray, currentColor, selectedSquare, range) => {
  const moves = []
  if (activeSquare.value.props.color === 'white') {

    if (!squareArray[dest[0]][dest[1]]) {
      // option to advance 2 spaces on first move
      if (row === 6 && !squareArray[5][column]) { moves.push([row - 2, column]) }

      // standard 1 space advance
      if (range.includes(row - 1)) { moves.push([row - 1, column]) }
    }

    // diagonal capture
    if (squareArray[dest[0]][dest[1]] && selectedSquare.props.color === 'black') { // if selected square has value && is other color
      if ((dest[0] === row - 1) && (dest[1] === column - 1)) {
         moves.push([row - 1, column - 1])
      }
      if ((dest[0] === row - 1) && (dest[1] === column + 1)) {
         moves.push([row - 1, column + 1])
      }
    }
  } else {
    if (!squareArray[dest[0]][dest[1]]) {
      // option to advance 2 spaces on first move
      if (row === 1 && !squareArray[2][column]) { moves.push([row + 2, column]) }

      // standard 1 space advance
      if (range.includes(row + 1) && !squareArray[dest[0]][dest[1]]) { moves.push([row + 1, column]) }
    }

    // diagonal capture
    if (squareArray[dest[0]][dest[1]] && selectedSquare.props.color === 'white') { // if selected square has value && is other color
      if ((dest[0] === row + 1) && (dest[1] === column - 1)) {
         moves.push([row + 1, column - 1])
      }
      if ((dest[0] === row + 1) && (dest[1] === column + 1)) {
         moves.push([row + 1, column + 1])
      }
    }
  }
  return moves
}
