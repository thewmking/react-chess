export const rookPath = (row, column, x, y, range) => {
  const squares = []

  var i
  if (x !== 0) {
    var xAbs = Math.abs(x)
    for (i = xAbs / x; Math.abs(i) < xAbs; x > 0 ? i++ : i--) {
      if (range.includes(row + i)) { squares.push([row + i, column])}
    }
  }

  var j
  if (y !== 0) {
    var yAbs = Math.abs(y)
    for (j = yAbs / y; Math.abs(j) < yAbs; y > 0 ? j++ : j--) {
      if (range.includes(column + j)) { squares.push([row, column + j])}
    }
  }

  return squares
}
