import React from 'react';
import './style.css'

export default ({
  type,  
  onChange=() => {}, 
  value="", 
  required=false, 
  classList,
  name,
  referencia
}) => {
  const handleChange = (e) => {
    const { name, value} = e.target
    let regex = /[^0-9]/g;
    let newValues = value.replace(regex, "");
    console.log(name, newValues)
    onChange(name, newValues);
  }
  return (
      <input 
      onChange={handleChange} 
      type={type} 
      className={`input-urna ${classList}`} 
      value={value} 
      required={required}
      maxLength={1}
      name={name}
      ref={referencia}
      />
    
  );
}