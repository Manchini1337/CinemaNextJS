import HeroSlide from '../components/heroslide/heroslide';
import { loadFeaturedMovies } from '../utils/api/fetch-data';
import Head from 'next/head';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Strona Główna</title>
        <meta
          name='description'
          content='Find a lot of great movies that are available to you in our cinema'
        />
      </Head>
      <HeroSlide movies={props.movies} />
    </>
  );
};

export const getStaticProps = async () => {
  const movies = await loadFeaturedMovies();

  return {
    props: { movies: movies },
  };
};

export default HomePage;
