import React from 'react';
import classNames from 'classnames';

function UnfilledButton(props) {
  const buttonClasses = classNames(
    'm-5',
    'bg-dimWhite',
    'hover:bg-dimWhite',
    'border',
    'border-primary',
    'border-2',
    'text-primary',
    'font-poppins',
    'py-6',
    'px-14'
  );

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default UnfilledButton;