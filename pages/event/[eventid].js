import HallPreview from '../../components/hallpreview/hallpreview';
import { loadEvent } from '../../utils/api/fetch-data';
import Head from 'next/head';

const EventPage = (props) => {
  const event = props.event;

  return (
    <>
      <Head>
        <title>{event.movie.name}</title>
        <meta name='description' content={event.movie.description} />
      </Head>
      <HallPreview event={event} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { params, req, res } = context;
  const eventId = params.eventid;

  const event = await loadEvent(eventId);

  return {
    props: { event: event },
  };
};

export default EventPage;
