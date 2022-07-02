import { loadAllMovies } from '../../utils/api/fetch-data';
import MovieDetails from '../../components/movie-details/moviedetails';
import Head from 'next/head';

const MoviePage = (props) => {
  const movie = props.movie;
  return (
    <>
      <Head>
        <title>{movie.name}</title>
        <meta name='description' content={movie.description} />
      </Head>
      <MovieDetails movie={movie} />
    </>
  );
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const movieId = params.movieid;

  const movies = await loadAllMovies();
  const movie = movies.find((m) => m.id === Number(movieId));

  return {
    props: { movie: movie },
  };
};

export const getStaticPaths = async () => {
  const movies = await loadAllMovies();
  const ids = movies.map((movie) => movie.id);

  const params = ids.map((id) => ({ params: { movieid: String(id) } }));

  return {
    paths: params,
    fallback: false,
  };
};

export default MoviePage;
