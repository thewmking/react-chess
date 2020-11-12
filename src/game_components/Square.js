function Square(props) {
  const classes = props.active ? 'square active' : 'square'
  return (
    <button className={classes} onClick={ props.onClick }>
      {props.value}
    </button>
  );
}

export default Square;
