import Piece from '../Piece.js';
function Rook(props) {
  var symbol = props.color === 'white' ? '♖' : '♜'
  return (
    <Piece name="Rook" symbol={symbol}/>
  )
}
export default Rook;
