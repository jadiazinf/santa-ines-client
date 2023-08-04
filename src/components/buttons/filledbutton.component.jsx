import React from 'react';
import classNames from 'classnames';

export const FilledButton = props => {
  const buttonClasses = classNames(
    'm-5',
    'bg-primary',
    'hover:bg-primary',
    'text-dimWhite',
    'font-poppins',
  );

  return (
    <button className={buttonClasses} onClick={props.onClick} type={props.type} style={{height: props.buttonHeight, width: props.buttonWidth, fontSize: props.textSize, textAlign: 'center'}}>
      {props.text}
    </button>
  );
}

{/*
  <FilledButton text="Crear Cuenta" buttonHeight={40} buttonWidth={90} textSize={10} onClick='' />
*/}
