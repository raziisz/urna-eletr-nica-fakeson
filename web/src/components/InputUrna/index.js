import React from 'react';
import './style.css'

export default ({
  type,  
  onChange=() => {}, 
  value="", 
  required=false, 
  classList
}) => {
  return (
      <input 
      onChange={onChange} 
      type={type} 
      className={`input-urna ${classList}`} 
      value={value} 
      required={required}
      maxLength={1}
      />
    
  );
}