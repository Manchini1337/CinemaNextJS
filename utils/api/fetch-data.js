import api from './axios.interceptor';

export const loadAllMovies = async () => {
  const response = await api.get('/movies');

  return response.data;
};

export const loadFeaturedMovies = async () => {
  const response = await api.get('/movies');

  const featuredMovies = response.data.slice(0, 5);

  return featuredMovies;
};

export const loadScreenings = async () => {
  const response = await api.get('/moviesevents');

  return response.data;
};

export const loadMovieGenres = async () => {
  const response = await api.get('/genres');

  return response.data;
};

export const loadAllEvents = async () => {
  const response = await api.get('/events');

  return response.data;
};

export const loadEvent = async (id) => {
  const response = await api.get(`/events/${id}`);

  return response.data;
};

export const loadOrders = async () => {
  const response = await api.get('/orders');

  return response.data;
};
