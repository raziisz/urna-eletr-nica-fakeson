import React, { useState, useCallback, useRef } from 'react';
import PrefeitoContainer from './PrefeitoContainer';
import VereadorContainer from './VereadorContainer';
import './styles.css'
import ConfirmSound from 'assets/sounds/confirmar.mp3';
import Logo from 'assets/images/logo_eleicao.png';


const Home = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [complement, setComplement] = useState(false);
  const [valuesMayor, setValuesMayor] = useState(["",""]);
  const [valuesVereador, setValuesVereador] = useState(["","","","",""])
  
  //refs mayor
  const digitMayor1 = useRef(null);
  const digitMayor2 = useRef(null);
  //refs vereador
  const digitVereador1 = useRef(null);
  const digitVereador2 = useRef(null);
  const digitVereador3 = useRef(null);
  const digitVereador4 = useRef(null);
  const digitVereador5 = useRef(null);

  const confirmRef = useRef(null);

  const handleValueMayor = useCallback((name ,value) => {
    if (name === "1") {
      setValuesMayor(prev => [value, prev[1]]);

      if (value) {
        digitMayor2.current.focus();
      }
    } else if (name === "2") {
      setValuesMayor(prev => [prev[0], value]);
      console.log(digitMayor1.current?.value,digitMayor2.current?.value)
      if (digitMayor1.current?.value == 1 && digitMayor2.current?.value == 2) {
        setComplement(prev => !prev);
      }
    }
  }, [digitMayor1, digitMayor2]);
  
  const handleValueVereador = useCallback((name ,value) => {
    if (name === "1") {
      setValuesVereador(prev => [value, prev[1], prev[2], prev[3], prev[4]]);

      if (value) {
        digitVereador2.current.focus();
      }
    } else if (name === "2") {
      setValuesVereador(prev => [prev[0], value, prev[2], prev[3], prev[4]]);

      if (value) {
        digitVereador3.current.focus();
      }
    } else if (name === "3") {
      setValuesVereador(prev => [prev[0], prev[1], value, prev[3], prev[4]]);

      if (value) {
        digitVereador4.current.focus();
      }
    } else if (name === "4") {
      setValuesVereador(prev => [prev[0], prev[1], prev[2], value, prev[4]]);

      if (value) {
        digitVereador5.current.focus();
      }
    } else if (name === "5") {
      setValuesVereador(prev => [prev[0], prev[1], prev[2], prev[3], value]);

      if (
        digitVereador1.current?.value == 1 && 
        digitVereador2.current?.value == 2 &&
        digitVereador3.current?.value == 0 &&
        digitVereador4.current?.value == 0 &&
        digitVereador5.current?.value == 0
        ) {
        setComplement(prev => !prev);
      }
    }
  }, [digitVereador1, digitVereador2, digitVereador3, digitVereador4, digitVereador5]);

  const handleConfirm = useCallback(() => {
    confirmRef.current.play();
    setComplement(prev => !prev);
    setStep(prev => prev + 1);
  }, [confirmRef]);

  const handleCorrection = useCallback((type) => {  
    if (type === 'prefeito') {
      setComplement(false);
      setValuesMayor(["",""]);
      digitMayor1.current.focus();
    }
    if (type === 'vereador') {
      setComplement(false);
      setValuesVereador(["","", "", "", ""]);
      digitVereador1.current.focus();
    }
  }, [digitMayor1, digitVereador1]);

  localStorage.clear();
  
  return (
    <>
    {step === 0 &&
      <div className="d-flex flex-column justify-content-center align-items-center align-content-center content">
        <img src={Logo} alt="Eleições 2020" className="logo"/>
        <h1>Seja bem vindo cidadão.</h1>
        <p>Seja inteligente vote consciente!</p>
        <button className="btn btn-primary" onClick={() => setStep(prev => prev+1)}>Iniciar</button>
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
        confirm={handleConfirm}
        correction={handleCorrection}
      />
    }
    {
      step === 2 &&
        <VereadorContainer
         complement={complement}
         onChange={handleValueVereador}
         error={error}
         value={valuesVereador}
         ref1={digitVereador1}
         ref2={digitVereador2}
         ref3={digitVereador3}
         ref4={digitVereador4}
         ref5={digitVereador5}
         confirm={handleConfirm}
         correction={handleCorrection}
         values={valuesVereador}
        
        />
    }
    {
      step === 3 &&
        <div className="d-flex flex-column justify-content-center align-items-center align-content-center content">
          <div className="card">
            <div className="card-body">
              <h1 className="title-end">FIM</h1>
            </div>
          </div>
          <button className="btn btn-secondary mt-3" onClick={() => setStep(0)}>RENICIAR</button>
        </div>
    }
      <audio src={ConfirmSound} preload="auto" ref={confirmRef}></audio>
    </>
   
  )
    
}

export default Home;