import { useEffect } from 'react';
import classes from './Redirect.module.css';
import { useRouter } from 'next/router';

const Redirect = (props) => {
  const router = useRouter();
  const path = props.path;
  useEffect(() => {
    setTimeout(function () {
      router.replace(path);
    }, 1000);
  }, [path, router]);
  return (
    <div className={classes.redirect}>
      <p>{props.children}</p>
      <p>Nastąpi przekierowanie...</p>
      <div className='lds-dual-ring'></div>
    </div>
  );
};

export default Redirect;
