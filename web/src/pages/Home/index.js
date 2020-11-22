import React, { useState } from 'react';
import './styles.css'
import InputUrna from 'components/InputUrna';

const Home = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [valuesMayor, setValuesMayor] = useState(["",""]);

  const handleValueMayor = (e) => {
    
  }
  return (
    <>
    {step === 0 &&
      <div className="d-flex flex-column justify-content-center align-items-center align-content-center content">
        <h1>Seja bem vindo cidadão.</h1>
        <p>Seja inteligente vote consciente!</p>
        <button className="btn btn-primary">Iniciar</button>
      </div>
    }
    {step === 1 &&
      <div className="d-flex flex-column justify-content-center align-items-center align-content-center content">
        <div className="card w-50 h-50">
          <div className="card-body d-flex flex-column">
            <h4>Meu voto para</h4>
            <h2 className="mt-2 align-self-center">PREFEITO(A)</h2>
            <form>
              <div className="form-group row mt-3">
                <label htmlFor="" className="col-sm-2 col-form-label">Números:</label>
                <InputUrna type="text" required />
                <InputUrna type="text" required />
              </div>
             {error && <p className="error">NÚMERO INVÁLIDO</p>}
            </form>
          </div>
        </div>
      </div>
    }
    </>
   
  )
    
}

export default Home;