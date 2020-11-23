import React, { useState, useCallback, useRef } from 'react';
import PrefeitoContainer from './PrefeitoContainer';
import './styles.css'


const Home = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(false);
  const [complement, setComplement] = useState(false);
  const [valuesMayor, setValuesMayor] = useState(["",""]);
  const digitMayor1 = useRef(null);
  const digitMayor2 = useRef(null);

  const handleValueMayor = useCallback((name ,value) => {
    if (name === "1") {
      setValuesMayor(prev => [value, prev[1]]);

      if (value) {
        digitMayor2.current.focus();
      }
    } else if (name === "2") {
      setValuesMayor(prev => [prev[0], value]);
      console.log(digitMayor1.current.value,digitMayor2.current.value)
      if (digitMayor1.current.value == 1 && digitMayor2.current.value == 2) {
        setComplement(prev => !prev);
      }
    }
  }, [digitMayor1, digitMayor2])
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
      <PrefeitoContainer 
        onChange={handleValueMayor} 
        complement={complement} 
        error={error}
        values={valuesMayor}
        ref1={digitMayor1}
        ref2={digitMayor2}
      />
    }
    </>
   
  )
    
}

export default Home;