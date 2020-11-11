import Piece from '../Piece.js';
function King(props) {
  var symbol = props.color === 'white' ? '♔' : '♚'
  return (
    <Piece name="King" symbol={symbol}/>
  )
}
export default King;
