export const CheckboxComponent = ({text, onChange, name, onBlur, id}) => {
  return (
    <div className=''>
      <input type='checkbox' id={id} name={name} onBlur={onBlur} onChange={onChange}/>
      <span>{text}</span>
    </div>
  );
}
