import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
  return (
    <button
      className={`${classes.btn} ${props.className}`}
      type={props.type ? props.type : 'button'}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

export const OutlineButton = (props) => {
  return (
    <Button
      className={`${classes.btn__outline} ${props.className}`}
      type={props.type ? props.type : 'button'}
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  );
};

export default Button;
