import React from 'react';

import './styles.css';

export default ({candidato}) => {
  return (
    <div className="row text-center py-2 row-border-child">
      <div className="col-sm-3">
        {candidato?.nomeCompleto}
      </div>
      <div className="col-sm-3">
        {candidato?.digito}
      </div>
      <div className="col-sm-3">
        {candidato?.legenda}
      </div>
      <div className="col-sm-3">
        {candidato?.votosRecebidos?.length || 0}
      </div>
    </div>
  )
}