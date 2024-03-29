import Square from './Square.js';
import React from 'react';

class Board extends React.Component {
  renderSquare(square, rowIndex, colIndex) {
    let darkSquare = false
    if ((rowIndex+1) % 2 === 0) {
      if ((colIndex+1) % 2 !== 0) {
        darkSquare = true
      }
    } else {
      if ((colIndex+1) % 2 === 0) {
        darkSquare = true
      }
    }
    return (
      <Square
        value={square}
        onClick={() => this.props.onClick(square, [rowIndex, colIndex])}
        key={[rowIndex, colIndex].toString()}
        active={this.props.activeSquare && this.props.activeSquare.coordinates.toString() === [rowIndex, colIndex].toString()}
        darkSquare={darkSquare}
      />
    );
  }

  renderRow(rowIndex) {
    var key = 'row-' + rowIndex;
    return (
      <div className="board-row" key={key}>
        {this.props.squareArray[rowIndex].map((square, colIndex) =>
          this.renderSquare(square, rowIndex, colIndex)
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.props.squareArray.map((row, index) =>
          this.renderRow(index)
        )}
      </div>
    );
  }
}

export default Board;
