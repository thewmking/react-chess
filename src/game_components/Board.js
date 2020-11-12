import Square from './Square.js';
import React from 'react';

class Board extends React.Component {
  renderSquare(square, rowIndex, index) {
    return (
      <Square
        value={square}
        onClick={() => this.props.onClick(square, rowIndex, index)}
        key={[rowIndex, index].toString()}
      />
    );
  }

  renderRow(rowIndex) {
    var key = 'row-' + rowIndex;
    return (
      <div className="board-row" key={key}>
        {this.props.squareArray[rowIndex].map((square, index) =>
          this.renderSquare(square, rowIndex, index)
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
