function Square(props) {
  let classes = props.active ? 'square active' : 'square'
  if (props.darkSquare) {
    classes = classes + ' dark'
  }
  return (
    <button className={classes} onClick={ props.onClick }>
      {props.value}
    </button>
  );
}

export default Square;
