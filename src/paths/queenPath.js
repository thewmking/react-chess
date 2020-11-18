export const queenPath = (row, column, x, y, range) => {
  const squares = []

  let i, j
  let xAbs = Math.abs(x)
  let yAbs = Math.abs(y)

  if (x !== 0 && y !== 0 && (xAbs === yAbs)) { // diagonal moves
    j = yAbs / y
    for (i = xAbs / x; Math.abs(i) < xAbs; x > 0 ? i++ : i--) {
      if (range.includes(row + i) & range.includes(column + j)) { squares.push([row + i, column + j])}
      if (j > 0) { j++ } else { j-- }
    }
  } else if (x !== 0 && y === 0) { // vertical moves
    for (i = xAbs / x; Math.abs(i) < xAbs; x > 0 ? i++ : i--) {
      if (range.includes(row + i)) { squares.push([row + i, column])}
    }
  } else if (y !== 0 && x === 0) { // horizontal moves
    for (j = yAbs / y; Math.abs(j) < yAbs; y > 0 ? j++ : j--) {
      if (range.includes(column + j)) { squares.push([row, column + j])}
    }
  }

  return squares
}
