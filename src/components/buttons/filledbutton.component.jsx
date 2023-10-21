import React from 'react';
import classNames from 'classnames';

export const FilledButton = props => {
  const buttonClasses = classNames(
    'bg-primary',
    'hover:bg-green-600',
    'text-white font-bold',
    'py-2',
    'px-4',
    'rounded',
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
