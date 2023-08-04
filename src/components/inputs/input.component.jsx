export const InputComponent = (props) => {

  const {id, name, placeholder, onChange, type, onBlur, value} = props;

  return (
    <div className=''>
      <span>{placeholder}</span>
      <input
        className=''
        id={id}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  )

}
