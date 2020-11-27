import React from 'react';
import './styles.css';

export default ({confirm = () => {}, correction = () => {}, annulment= () => {}, error=false}, ) => {
  return (
    <div className="row group-buttons">
      <button onClick={annulment} className="button-white">BRANCO</button>
      <button onClick={correction} className="button-red">CORRIGE</button>
      <button disabled={error} onClick={confirm} className="button-green">CONFIRMAR</button>
    </div>
  )
}