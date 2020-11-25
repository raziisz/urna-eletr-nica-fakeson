import React from 'react';

export default ({
  label, 
  type,   
  placeholder, 
  onChange=() => {}, 
  value="", 
  required=false, 
  maxLength,
  name,
  accept = "",
  classList="",
  children
}) => {
  return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input onChange={onChange} type={type} className={classList} placeholder={placeholder} name={name} value={value} required={required} maxLength={maxLength} accept={accept}/>
        {children}
      </div>
    )
}