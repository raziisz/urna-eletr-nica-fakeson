import React from 'react';
import './styles.css';

export default ({confirm = () => {}, correction = () => {}}) => {
  return (
    <div className="row group-buttons">
      <button className="button-white">BRANCO</button>
      <button onClick={correction} className="button-red">CORRIGE</button>
      <button onClick={confirm} className="button-green">CONFIRMAR</button>
    </div>
  )
}