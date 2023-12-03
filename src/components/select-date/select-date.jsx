import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SelectDateComponent = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const selectDateRef = useRef();

  const { id, name, placeholder, onChange, value, error, className1, options } = props;

  const handleSelectDateClick = () => {
    setIsSelected(true);
    selectDateRef.current.setOpen(true);
  };

  const handleSelectDateBlur = () => {
    setIsSelected(false);
  };

  const handleDateChange = (date) => {
    onChange(date);
  };

  return (
    <div className={`${className1 ? className1 : 'w-[550px]'} border border-gray-500 flex flex-col relative `}>
      <div className="flex flex-row">
        <span className={`w-1 ${isSelected ? 'bg-green-400 duration-300' : ''}`}></span>
        <div className="flex flex-col justify-center p-2 w-full" onClick={handleSelectDateClick}>
          <span className="text-textTitle">{placeholder}</span>
          <DatePicker
            ref={selectDateRef}
            className='text-textInput border-none outline-none w-full bg-transparent'
            id={id}
            name={name}
            selected={value}
            onChange={handleDateChange}
            onBlur={handleSelectDateBlur}
            dateFormat='yyyy-MM-dd'
            calendarClassName='custom-calendar'
          />
        </div>
      </div>
    </div>
  );
};