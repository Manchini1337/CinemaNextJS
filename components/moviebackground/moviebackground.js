import classes from './MovieBackground.module.css';

const MovieBackground = (props) => {
  return (
    <div
      className={classes.banner}
      style={{ backgroundImage: `url(${props.background})` }}
    ></div>
  );
};

export default MovieBackground;
