import React from 'react';
import InputUrna from 'components/InputUrna';
import ButtonsUrna from 'components/ButtonsUrna';
import './styles.css';

import { baseURL } from 'services/api';

const VereadorContainer = ({
  complement = false,
  onChange=() => {},
  values,
  ref1,
  ref2,
  ref3,
  ref4,
  ref5,
  error = false,
  confirm = () => {},
  correction = () => {},
  annulment = () => {},
  candidatoVereador
}) => {

  let noPreenchido = true;
  if (values[0] !== "" && values[1] !== "" && values[2] !== "" && values[3] !== "" && values[4] !== "")
    noPreenchido = false;

  const imageVereador = `${baseURL}/images/${candidatoVereador.fotoCandidato}`;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center align-content-center content">
        <div className="card w-75">
          <div className="card-body d-flex flex-column">
            <h4>Meu voto para</h4>
            <h2 className="mt-2 align-self-center">VEREADOR(A)</h2>
            {complement && 
              <div className="image-candidate card" >
                <img className="card-img-top" src={imageVereador} alt="Candidato vereador" />
                <h5 className="card-title">Vereador(a)</h5>
              </div>}
            <div className="form-group row mt-3">
              <label htmlFor="" className="col-sm-2 col-form-label">Números:</label>
              <InputUrna type="text" required name="1" onChange={onChange} value={values[0]} referencia={ref1}/>
              <InputUrna type="text" required name="2" onChange={onChange} value={values[1]} referencia={ref2}/>
              <InputUrna type="text" required name="3" onChange={onChange} value={values[2]} referencia={ref3}/>
              <InputUrna type="text" required name="4" onChange={onChange} value={values[3]} referencia={ref4}/>
              <InputUrna type="text" required name="5" onChange={onChange} value={values[4]} referencia={ref5}/>
            </div>
             {error && <p className="error">NÚMERO INVÁLIDO</p>}
             {complement && 
             <>
                <div className="form-group row mt-2">
                  <label className="col-sm-2">Nome:</label>
                  <label className="col-sm-4">{candidatoVereador.nomeCompleto}</label>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-sm-2">Legenda:</label>
                  <label className="col-sm-4">{candidatoVereador.legenda}</label>
                </div>
                <hr/>
                <div className="info">
                  <p>Aperte no botão:</p>
                  <p >
                    <strong>CONFIRMAR</strong> para <strong>CONFIRMAR</strong> este voto
                  </p>
                  <p>
                    <strong>CORRIGE</strong> para <strong>RENICIAR</strong> este voto
                  </p>
                </div>

              </>
             }
             <ButtonsUrna annulment={annulment} confirm={() => confirm('vereador')} correction={() => correction('vereador')}/>
          </div>
        </div>
      </div>
  )
}

export default VereadorContainer;