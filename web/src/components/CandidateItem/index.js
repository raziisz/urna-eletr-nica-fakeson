import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

const type = {
  "1": "Prefeito",
  "2": "Vereador"
}

export default ({ data }) => {
  console.log(data.urlFotoCandidato)
  return (
    <div className="row mt-2 mb-2">
    <div className="col-sm-1">
      <img src={data.urlFotoCandidato} alt={data.nomeCompleto}/>
    </div>
    <div className="col-sm-2">
      <div className="d-flex flex-column">
          <span className="title-span">Nome Completo:</span>
          <span className="text-span">{data.nomeCompleto}</span>
      </div>
    </div>
    <div className="col-sm-2">
      <div className="d-flex flex-column">
      <span className="title-span">Tipo de candidatura:</span>
          <span className="text-span">{type[data.tipoCandidato]}</span>
      </div>
    </div>
     {data.type === 2 &&
      <div className="col-sm-2">
        <div className="d-flex flex-column">
        <span className="title-span">Nome do Vice:</span>
            <span className="text-span">{data.nomeVice}</span>
        </div>
      </div>}
    <div className="col-sm-2">
      <div className="d-flex flex-column">
      <span className="title-span">Legenda:</span>
         <span className="text-span">{data.legenda}</span>
      </div>
    </div>
    <div className={`col-sm-3 ${data.type === 2 && "offset-sm-2"}`}>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <span className="title-span">Ações</span>
        <div className="btn-group btn-group-sm">
          <button className="btn btn-secondary">
            <FiEdit />
          </button>
          <button className="btn btn-danger">
            <FiTrash />
          </button>
          
        </div>
      </div>
    </div>
  </div>
  )
}