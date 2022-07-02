import classes from './UserPanel.module.css';
import UserForm from './userform';
import TicketHistory from './tickethistory';

const UserPanel = ({ user }) => {
  return (
    <div className={classes.container}>
      <TicketHistory />
      <UserForm user={user} />
    </div>
  );
};

export default UserPanel;
