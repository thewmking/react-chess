import Square from './Square.js';
import React from 'react';

class Board extends React.Component {
  renderSquare(square, i) {
    return (
      <Square
        value={square}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow(rowIndex) {
    return (
      <div className="board-row">
        {this.props.squareArray[rowIndex].map((square, index) =>
          this.renderSquare(square, index)
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
