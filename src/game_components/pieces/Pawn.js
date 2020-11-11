import Piece from '../Piece.js';
function Pawn(props) {
  var symbol = props.color === 'white' ? '♙' : '♟'
  return (
    <Piece name="Pawn" symbol={symbol}/>
  )
}
export default Pawn;
