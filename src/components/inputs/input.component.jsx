import { useRef } from "react";

export const InputComponent = (props) => {

  const {id, name, placeholder, onChange, type, onBlur, value, error} = props;
  //Deberia tener un estado para saber si esta seleccionado o no el campo, que lo puedo tener en el padre
  // de esta manera podemos mostrar o no el span de color verde
  const selectedDiv =  true;

  //De esta manera tenemos una referencia al input, y cada que se seleccione el componente completo, se va a seleccionar el input
  const inputRef = useRef();
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className=' w-[550px] border border-gray-500 flex flex-col relative ' onClick={handleClick}>
      <div>
      <span className={`${selectedDiv ? 'bg-green-400' : ''} w-1`}></span>
        <div className="flex flex-col justify-center p-2 w-full">
          <span className="text-textTitle">{placeholder}</span>
          <input
            ref={inputRef}
            className=' text-textInput border-none outline-none w-full bg-transparent'
            id={id}
            name={name}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        </div>
      </div>
      { error ? (<div className="ml-1 mr-1 mt-1 text-red-500 text-xs absolute right-0">{error}</div>) : null }
    </div>
  )

}
