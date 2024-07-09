function FormInputField({ name, label, defaultValue, type = "text", placeholder }) {
  return (
    <div className="form-input-field">
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} placeholder={placeholder} defaultValue={defaultValue}/>
    </div>
  );
}
export default FormInputField;
