import classes from './MovieDetails.module.css';
import React, { useEffect, useRef } from 'react';

const MovieDetails = (props) => {
  const movie = props.movie;
  return (
    <>
      <div
        className={classes.banner}
        style={{ backgroundImage: `url(${movie.background})` }}
      ></div>
      <div className={`mb-3 container ${classes.movie_content}`}>
        <div className={classes.movie_content__poster}>
          <div
            className={classes.movie_content__poster__img}
            style={{ backgroundImage: `url(${movie.poster})` }}
          ></div>
        </div>
        <div className={classes.movie_content__info}>
          <div className={classes.title}>{movie.name}</div>
          <div className='mb-3'>
            <span className={classes.genre__item}>{movie.genre.name}</span>
          </div>
          <p className={classes.overview}>{movie.description}</p>
        </div>
      </div>
      <div className='container'>
        <div className='mb-3 section'>
          <Video movie={movie} />
        </div>
      </div>
    </>
  );
};

const Video = (props) => {
  const movie = props.movie;
  const urlCode = movie.trailerUrl.slice(32);

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className={classes.video}>
      <div className={classes.video__title}>
        <h2>{movie.name} - oficjalny zwiastun filmu</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${urlCode}`}
        ref={iframeRef}
        width='100%'
        title='video'
      ></iframe>
    </div>
  );
};

export default MovieDetails;
