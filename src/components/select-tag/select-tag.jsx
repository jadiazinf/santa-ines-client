import React, { useState, useRef } from 'react';

export const SelectComponent = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const selectRef = useRef(); // Create a ref using the `useRef` hook

  const { id, name, placeholder, onChange, value, error, className1, options } = props;

  const handleSelectClick = () => {
    setIsSelected(true);
    selectRef.current.focus();
  };

  const handleSelectBlur = () => {
    setIsSelected(false);
  };

  return (
    <div className={`${className1 ? className1 : 'w-[550px]'} border border-gray-500 flex flex-col relative `}>
      <div className="flex flex-row">
        <span className={`w-1 ${isSelected ? 'bg-green-400 duration-300' : ''}`}></span>
        <div className="flex flex-col justify-center p-2 w-full" onClick={handleSelectClick}>
          <span className="text-textTitle">{placeholder}</span>
          <select
            ref={selectRef}
            className='text-textInput border-none outline-none w-full bg-transparent'
            id={id}
            name={name}
            onChange={onChange}
            onBlur={handleSelectBlur}
            value={value}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}