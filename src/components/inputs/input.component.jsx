import { useEffect, useRef, useState } from "react";

export const InputComponent = (props) => {
    const [isSelected, setIsSelected] = useState(false);

  const {id, name, placeholder, onChange, type, onBlur, value, error, className1} = props;
  const inputRef = useRef();

  const handleInputClick = () => {
    setIsSelected(true);
    inputRef.current.focus();
  };

  const handleInputBlur = () => {
    setIsSelected(false);
  };

  return (
    <div className={`${className1 ? className1 : 'w-[550px]'} border border-gray-500 flex flex-col relative `} onClick={handleInputClick}>
      <div className="flex flex-row">
        <span className={`${isSelected ? 'bg-green-400 duration-300' : ''} w-1`}></span>
        <div className="flex flex-col justify-center p-2 w-full">
          <span className="text-textTitle">{placeholder}</span>
          <input
            ref={inputRef}
            className=' text-textInput border-none outline-none w-full bg-transparent'
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            onBlur={handleInputBlur}
            value={value}
          />
        </div>
      </div>
      { error ? (<div className="ml-1 mr-1 mt-1 text-red-500 text-xs absolute right-0">{error}</div>) : null }
    </div>
  )

}
