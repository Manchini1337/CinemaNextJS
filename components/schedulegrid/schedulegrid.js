import classes from './ScheduleGrid.module.css';
import { OutlineButton } from '../button/button';
import { format, isSameDay } from 'date-fns';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ScheduleGrid = (props) => {
  const movies = props.movies;
  const date = props.date;
  const router = useRouter();

  const chosenDayMovies = movies.filter((event) =>
    event.movieEvents.some((screening) =>
      isSameDay(new Date(screening.startDate), date)
    )
  );

  if (!chosenDayMovies.length) {
    return <p className={classes.warning}>Brak seansów w wybranym dniu.</p>;
  }

  return (
    <div className={classes.container}>
      {chosenDayMovies.map((event) => {
        const chosenMovieScreening = event.movieEvents.filter((screening) =>
          isSameDay(new Date(screening.startDate), date)
        );

        return (
          <div className={classes.screening} key={event.id}>
            <div className={classes.screening__poster}>
              <img src={event.poster} alt='poster' />
            </div>
            <div className={classes.screening__content}>
              <div className={classes.screening__title}>
                <h2>
                  <Link href={`/movie/${event.id}`}>{event.name}</Link>
                </h2>
              </div>
              <div className={classes.screening__desc}>{event.description}</div>
              <div className={classes.screening__buttons}>
                {chosenMovieScreening.map((screening) => (
                  <OutlineButton
                    key={screening.id}
                    className={classes.screening__button}
                    onClick={() => {
                      router.push(`/event/${screening.id}`);
                    }}
                  >
                    {format(new Date(screening.startDate), 'HH:mm')}
                  </OutlineButton>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ScheduleGrid;
