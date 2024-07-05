function FormDropdownField({ name, label, options, defaultValue, onChange }) {
    return (
      <div className="form-dropdown-field">
        <label htmlFor={name}>{label}</label>
        <select id={name} name={name} onChange={onChange} defaultValue={defaultValue}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>        
      </div>
    );
  }
  export default FormDropdownField
  