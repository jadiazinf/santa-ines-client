import React from 'react';
import classNames from 'classnames';

export const UnfilledButton = props => {
  const buttonClasses = classNames(
    'm-5',
    'bg-dimWhite',
    'hover:bg-dimWhite',
    'border',
    'border-primary',
    'border-2',
    'text-primary',
    'font-poppins',
  );

  return (
    <button className={buttonClasses} onClick={props.onClick} type={props.type} style={{height: props.buttonHeight, width: props.buttonWidth, fontSize: props.textSize, textAlign: 'center'}}>
      {props.text}
    </button>
  );
}

{/*
  <UnfilledButton text="Crear Cuenta" buttonHeight={40} buttonWidth={90} textSize={10} onClick='' />
*/}
