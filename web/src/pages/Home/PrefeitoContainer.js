import React from 'react';
import InputUrna from 'components/InputUrna';
import ButtonsUrna from 'components/ButtonsUrna';
import './styles.css';

import { baseURL } from 'services/api';

const PrefeitoContainer = ({
  complement = false,
  onChange=() => {},
  values,
  ref1,
  ref2,
  error = false,
  confirm = () => {},
  correction = () => {},
  annulment = () => {},
  candidatoPrefeito
}) => {
  const imagePrefeito = `${baseURL}/images/${candidatoPrefeito.fotoCandidato}`;
  const imageVice = `${baseURL}/images/${candidatoPrefeito.fotoVice}`;
  let noPreenchido = true;

  if (values[0] !== "" && values[1] !== "") {
    noPreenchido = false;
  }
  console.log(values[0], values[1])
  return (
    <div className="d-flex flex-column justify-content-center align-items-center align-content-center content">
        <div className="card w-50">
          <div className="card-body d-flex flex-column">
            <h4>Meu voto para</h4>
            <h2 className="mt-2 align-self-center">PREFEITO(A)</h2>
            {complement && 
              <div className="image-candidate card" >
                <img className="card-img-top" src={imagePrefeito} alt="Candidato prefeito" />
                <h5 className="card-title">Prefeito(a)</h5>
              </div>}
            <div className="form-group row mt-3">
              <label htmlFor="" className="col-sm-2 col-form-label">Números:</label>
              <InputUrna type="text" required name="1" onChange={onChange} value={values[0]} referencia={ref1}/>
              <InputUrna type="text" required name="2" onChange={onChange} value={values[1]} referencia={ref2}/>
            </div>
             {error && <p className="error">NÚMERO INVÁLIDO</p>}
             {complement && 
             <>
                <div className="form-group row mt-2">
                  <label className="col-sm-2">Nome:</label>
                  <label className="col-sm-4">{candidatoPrefeito.nomeCompleto}</label>
                </div>
                <div className="image-vice card" >
                  <img className="card-img-top" src={imageVice} alt="Candidato vice-prefeito" />
                  <h5 className="card-title">Vice</h5>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-sm-2">Legenda:</label>
                  <label className="col-sm-4">{candidatoPrefeito.legenda}</label>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-sm-3">Vice-Prefeito(a):</label>
                  <label className="col-sm-4">{candidatoPrefeito.nomeVice}</label>
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
            <ButtonsUrna error={error || noPreenchido}  confirm={() => confirm('prefeito')} correction={() => correction('prefeito')} annulment={annulment}/>
          </div>
        </div>
      </div>
  )
}

export default PrefeitoContainer;