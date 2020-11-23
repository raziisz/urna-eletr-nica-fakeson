import React from 'react';

export default ({
  label, 
  type, 
  placeholder, 
  onChange=() => {}, 
  value="", 
  required=false, 
  maxLength = 0,
  name
}) => {
  return (
      <div className="form-group">
        <label htmlFor="nome">{label}</label>
        <input onChange={onChange} type={type} className="form-control" placeholder={placeholder} name={name} value={value} required={required} maxLength={maxLength}/>
      </div>
    )
}