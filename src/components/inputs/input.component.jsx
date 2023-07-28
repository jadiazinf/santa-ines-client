export const InputComponent = (props) => {

  const {name, placeholder, onChange, type} = props;

  return (
    <input className=''
      name={name}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
    />
  )

}
