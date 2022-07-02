import classes from './EventForm.module.css';
import { useState, useEffect, useRef } from 'react';
import api from '../../utils/api/axios.interceptor';
import { OutlineButton } from '../button/button';
import BasicDateTimePicker from '../datepicker/BasicDateTimePicker';

const EventForm = () => {
  const formRef = useRef(null);

  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    formRef.current.classList.add(`${classes.active}`);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const resetSelect = () => {
    const select = document.getElementById('select');
    select.selectedIndex = 0;
    setMovieId(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (movieId === 0) {
      setErrorMessage('Niepoprawne dane!');
      return;
    }

    try {
      const response = await api.post('/events', {
        movieId: Number(movieId),
        startDate,
        endDate,
      });
      if (response) {
        setSuccessMessage(true);
        setMovieId(0);
        resetSelect();
        setStartDate(new Date());
        setEndDate(new Date());
      }
    } catch (error) {
      setErrorMessage('Niepoprawne dane!');
    }
    resetSelect();
  };
  return (
    <div className={classes.container}>
      <form ref={formRef} className={classes.form} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Dodaj seans</h2>
        <div className={classes.form__group}>
          <label htmlFor='movieId'>Film:</label>
          <select
            id='select'
            className={classes.select}
            onChange={(e) => {
              setMovieId(e.target.value);
              setErrorMessage('');
              setSuccessMessage(false);
            }}
          >
            <option value={0}>---</option>
            {movies.map((movie) => (
              <option value={movie.id} key={movie.id}>
                {movie.name}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='startDate'>Data i godzina seansu:</label>
          <div>
            <BasicDateTimePicker
              label='Seans'
              date={startDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </div>
        </div>

        <div className={classes.btn__group}>
          <OutlineButton className={classes.btn__submit} type='submit'>
            Dodaj seans
          </OutlineButton>
        </div>
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        {successMessage && (
          <p className={classes.success}>Pomyślnie dodano seans</p>
        )}
      </form>
    </div>
  );
};

export default EventForm;
