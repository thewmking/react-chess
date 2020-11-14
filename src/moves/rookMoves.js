export const rookMoves = (row, column, range) => {
  const moves = []

  var i;
  for (i = 1; i < 9; i++) {
    if (range.includes(row - i)) { moves.push([row - i, column])}
    if (range.includes(row + i)) { moves.push([row + i, column])}
    if (range.includes(column - i)) { moves.push([row, column - i])}
    if (range.includes(column + i)) { moves.push([row, column + i])}
  }

  return moves
}
