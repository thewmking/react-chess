export const knightMoves = (row, column, range) => {
  const moves = []

  if (range.includes(row - 2) && range.includes(column - 1)) { moves.push([row - 2, column - 1])}
  if (range.includes(row - 2) && range.includes(column + 1)) { moves.push([row - 2, column + 1])}
  if (range.includes(row + 2) && range.includes(column + 1)) { moves.push([row + 2, column + 1])}
  if (range.includes(row + 2) && range.includes(column - 1)) { moves.push([row + 2, column - 1])}
  if (range.includes(row - 1) && range.includes(column - 2)) { moves.push([row - 1, column - 2])}
  if (range.includes(row - 1) && range.includes(column + 2)) { moves.push([row - 1, column + 2])}
  if (range.includes(row + 1) && range.includes(column + 2)) { moves.push([row + 1, column + 2])}
  if (range.includes(row + 1) && range.includes(column - 2)) { moves.push([row + 1, column - 2])}

  return moves
}
