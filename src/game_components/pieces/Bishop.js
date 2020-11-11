import Piece from '../Piece.js';
function Bishop(props) {
  var symbol = props.color === 'white' ? '♗' : '♝'
  return (
    <Piece name="Bishop" symbol={symbol}/>
  )
}
export default Bishop;
