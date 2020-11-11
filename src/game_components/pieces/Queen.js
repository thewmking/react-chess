import Piece from '../Piece.js';
function Queen(props) {
  var symbol = props.color === 'white' ? '♕' : '♛'
  return (
    <Piece name="Queen" symbol={symbol}/>
  )
}
export default Queen;
