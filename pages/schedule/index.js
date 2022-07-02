import { useState } from 'react';
import ScheduleGrid from '../../components/schedulegrid/schedulegrid';
import { loadScreenings } from '../../utils/api/fetch-data';
import Calendar from '../../components/calendar/calendar';
import Head from 'next/head';

const SchedulePage = (props) => {
  const [date, setDate] = useState(new Date());
  const movies = props.movies;

  const setDates = (dates) => {
    setDate(dates);
  };

  return (
    <>
      <Head>
        <title>Harmonogram</title>
        <meta
          name='description'
          content='Available schedule of events at the cinema'
        />
      </Head>
      <Calendar setDates={setDates} />
      <ScheduleGrid movies={movies} date={date} />
    </>
  );
};

export const getStaticProps = async () => {
  const movies = await loadScreenings();

  return {
    props: { movies: movies },
  };
};

export default SchedulePage;
