export const bishopPath = (row, column, x, y, range) => {
  const squares = []

  let i, j
  let xAbs = Math.abs(x)
  let yAbs = Math.abs(y)
  if (x !== 0 && y !== 0 && (xAbs === yAbs)) {
    j = yAbs / y
    for (i = xAbs / x; Math.abs(i) < xAbs; x > 0 ? i++ : i--) {
      if (range.includes(row + i) & range.includes(column + j)) { squares.push([row + i, column + j])}
      if (j > 0) { j++ } else { j-- }
    }
  }

  return squares
}
