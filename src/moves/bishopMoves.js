export const bishopMoves = (row, column, range) => {
  const moves = []

  var i;
  for (i = 1; i < 9; i++) {
    if (range.includes(row - i) && range.includes(column - i)) { moves.push([row - i, column - i])}
    if (range.includes(row - i) && range.includes(column + i)) { moves.push([row - i, column + i])}
    if (range.includes(row + i) && range.includes(column + i)) { moves.push([row + i, column + i])}
    if (range.includes(row + i) && range.includes(column - i)) { moves.push([row + i, column - i])}
  }

  return moves
}
