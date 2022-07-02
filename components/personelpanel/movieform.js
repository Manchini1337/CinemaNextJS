import classes from './MovieForm.module.css';
import { useState, useEffect, useRef } from 'react';
import api from '../../utils/api/axios.interceptor';
import { OutlineButton } from '../button/button';

const MovieForm = () => {
  const formRef = useRef(null);

  const [genres, setGenres] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trailerUrl: '',
    genreId: 0,
    poster: '',
    background: '',
  });

  useEffect(() => {
    formRef.current.classList.add(`${classes.active}`);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/genres');
        setGenres(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const resetSelect = () => {
    const select = document.getElementById('select');
    select.selectedIndex = 0;
    setFormData({ ...formData, genreId: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.genreId === 0) {
      setErrorMessage('Niepoprawne dane!');
      return;
    }
    try {
      const response = await api.post('/movies', {
        name: formData.name,
        description: formData.description,
        trailerUrl: formData.trailerUrl,
        genreId: formData.genreId,
        poster: formData.poster,
        background: formData.background,
      });
      if (response) {
        setSuccessMessage(true);
        setFormData({
          name: '',
          description: '',
          trailerUrl: '',
          genreId: 0,
          poster: '',
          background: '',
        });
        resetSelect();
      }
    } catch (error) {
      setErrorMessage('Wystąpił błąd, spróbuj ponownie');
    }
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} ref={formRef} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Dodaj film</h2>
        <div className={classes.form__group}>
          <label htmlFor='name'>Tytuł:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='name'
              name='name'
              placeholder='Tytuł'
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrorMessage('');
                setSuccessMessage(false);
              }}
              value={formData.name}
            />
            <i className='bx bx-movie' />
          </div>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='name'>Opis:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='description'
              name='description'
              placeholder='Opis'
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrorMessage('');
                setSuccessMessage(false);
              }}
              value={formData.description}
            />
            <i className='bx bx-text' />
          </div>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='name'>Link do trailera YouTube:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='trailerUrl'
              name='trailerUrl'
              placeholder='Wklej link'
              onChange={(e) => {
                setFormData({ ...formData, trailerUrl: e.target.value });
                setErrorMessage('');
                setSuccessMessage(false);
              }}
              value={formData.trailerUrl}
            />
            <i className='bx bx-movie-play' />
          </div>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='genreId'>Kategoria:</label>
          <select
            id='select'
            className={classes.select}
            onChange={(e) => {
              setFormData({ ...formData, genreId: e.target.value });
              setErrorMessage('');
              setSuccessMessage(false);
            }}
          >
            <option value={0}>---</option>
            {genres.map((genre) => (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='name'>Plakat:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='poster'
              name='poster'
              placeholder='Wklej plakat'
              onChange={(e) => {
                setFormData({ ...formData, poster: e.target.value });
                setErrorMessage('');
                setSuccessMessage(false);
              }}
              value={formData.poster}
            />
            <i className='bx bx-image' />
          </div>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='name'>Tło:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='background'
              name='background'
              placeholder='Wklej tło'
              onChange={(e) => {
                setFormData({ ...formData, background: e.target.value });
                setErrorMessage('');
                setSuccessMessage(false);
              }}
              value={formData.background}
            />
            <i className='bx bx-image' />
          </div>
        </div>
        <div className={classes.btn__group}>
          <OutlineButton className={classes.btn__submit} type='submit'>
            Dodaj film
          </OutlineButton>
        </div>
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
        {successMessage && (
          <p className={classes.success}>Pomyślnie dodano film do bazy</p>
        )}
      </form>
    </div>
  );
};

export default MovieForm;
