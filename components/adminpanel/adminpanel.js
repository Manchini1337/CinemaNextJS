import PersonelTable from './personeltable';
import classes from './AdminPanel.module.css';

const AdminPanel = () => {
  return (
    <div className={classes.container}>
      <PersonelTable />
    </div>
  );
};

export default AdminPanel;
