export const kingMoves = (row, column, range) => {
  const moves = []
  if (range.includes(row - 1)) { moves.push([row - 1, column]) }
  if (range.includes(row + 1)) { moves.push([row + 1, column]) }
  if (range.includes(column - 1)) { moves.push([row, column - 1]) }
  if (range.includes(column + 1)) { moves.push([row, column + 1]) }
  if (range.includes(row - 1) && range.includes(column - 1)) { moves.push([row - 1, column - 1]) }
  if (range.includes(row - 1) && range.includes(column + 1)) { moves.push([row - 1, column + 1]) }
  if (range.includes(row + 1) && range.includes(column - 1)) { moves.push([row + 1, column - 1]) }
  if (range.includes(row + 1) && range.includes(column + 1)) { moves.push([row + 1, column + 1]) }
  return moves
}
