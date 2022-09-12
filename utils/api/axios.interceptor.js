import axios from 'axios';

export default axios.create({
  baseURL: 'https://cinemanextjsbackend.herokuapp.com',
  withCredentials: true,
});
