import React from 'react';
import classNames from 'classnames';

function FilledButton(props) {
  const buttonClasses = classNames(
    'm-5',
    'bg-primary',
    'hover:bg-primary',
    'text-dimWhite',
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

export default FilledButton;