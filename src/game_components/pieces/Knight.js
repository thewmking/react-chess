import Piece from '../Piece.js';
function Knight(props) {
  var symbol = props.color === 'white' ? '♘' : '♞'
  return (
    <Piece name="Knight" symbol={symbol}/>
  )
}
export default Knight;
