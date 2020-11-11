function Piece(props) {
  return (
    <div className={props.name}>
      {props.symbol}
    </div>
  )
}
export default Piece;
