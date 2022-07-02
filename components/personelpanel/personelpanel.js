import OrderTable from './ordertable';
import classes from './PersonelPanel.module.css';
import MovieForm from './movieform';
import EventForm from './eventform';

const PersonelPanel = () => {
  return (
    <div className={classes.container}>
      <OrderTable />
      <MovieForm />
      <EventForm />
    </div>
  );
};

export default PersonelPanel;
