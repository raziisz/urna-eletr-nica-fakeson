import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import './styles.css'
import ConfirmSound from 'assets/sounds/confirmar.mp3';
import Logo from 'assets/images/logo_eleicao.png';

import api from 'services/api';

import Loading from 'components/Loading';
import PrefeitoContainer from './PrefeitoContainer';
import VereadorContainer from './VereadorContainer';

const Home = () => {
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complement, setComplement] = useState(false);
  const [valuesMayor, setValuesMayor] = useState(["",""]);
  const [valuesVereador, setValuesVereador] = useState(["","","","",""])
  
  
  //refs mayor
  const digitMayor1 = useRef(null);
  const digitMayor2 = useRef(null);
  const [candidatoPrefeito, setCandidatoPrefeito] = useState({});
  //refs vereador
  const digitVereador1 = useRef(null);
  const digitVereador2 = useRef(null);
  const digitVereador3 = useRef(null);
  const digitVereador4 = useRef(null);
  const digitVereador5 = useRef(null);
  const [candidatoVereador, setCandidatoVereador] = useState({});
  
  const confirmRef = useRef(null);
  
  const history = useHistory();
  useEffect(() => {
    if (step === 1) {
      digitMayor1.current.focus();
    }
    if (step === 2) {
      digitVereador1.current.focus();
    }
  }, [step, digitMayor1, digitVereador1])


  const handleValueMayor = useCallback(async (name ,value) => {
    if (name === "1") {
      setValuesMayor(prev => [value, prev[1]]);
      await checkPrefeito();
      
      if (value) {
        digitMayor2.current.focus();
      }
    } else if (name === "2") {
      setValuesMayor(prev => [prev[0], value]);
      await checkPrefeito();
      
    }
  }, [digitMayor1, digitMayor2]);
  
  const handleValueVereador = useCallback( async (name ,value) => {
    if (name === "1") {
      setValuesVereador(prev => [value, prev[1], prev[2], prev[3], prev[4]]);
      await checkVereador()

      if (value) {
        digitVereador2.current.focus();
      }
    } else if (name === "2") {
      setValuesVereador(prev => [prev[0], value, prev[2], prev[3], prev[4]]);
      await checkVereador()

      if (value) {
        digitVereador3.current.focus();
      }
    } else if (name === "3") {
      setValuesVereador(prev => [prev[0], prev[1], value, prev[3], prev[4]]);
      await checkVereador()

      if (value) {
        digitVereador4.current.focus();
      }
    } else if (name === "4") {
      setValuesVereador(prev => [prev[0], prev[1], prev[2], value, prev[4]]);
      await checkVereador()
      if (value) {
        digitVereador5.current.focus();
      }
    } else if (name === "5") {
      setValuesVereador(prev => [prev[0], prev[1], prev[2], prev[3], value]);
      await checkVereador()

    }
  }, [digitVereador1, digitVereador2, digitVereador3, digitVereador4, digitVereador5]);

  const checkVereador = async () => {
    if (
      digitVereador1.current?.value !== "" && 
      digitVereador2.current?.value !== "" &&
      digitVereador3.current?.value !== "" &&
      digitVereador4.current?.value !== "" &&
      digitVereador5.current?.value !== ""
      ) {
      digitVereador1.current.disabled = true;
      digitVereador2.current.disabled = true;
      digitVereador3.current.disabled = true;
      digitVereador4.current.disabled = true;
      digitVereador5.current.disabled = true;

      try {
        let data = `${digitVereador1.current.value}${digitVereador2.current?.value}${digitVereador3.current.value}${digitVereador4.current?.value}${digitVereador5.current?.value}`;

        const result = await api.get(`/api/v1/candidate/bydigit/${data}`);

        if (result.status === 200) {
          setCandidatoVereador(result.data.candidato);
          setComplement(true);
          setError(false);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError(true);
          } else if (error.response.status === 500) {
              toast.error(error.response.data.message);
          }
        } else {
            toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      }
    }
  }

  const checkPrefeito = async () => {
    if (digitMayor1.current?.value !== "" && digitMayor2.current?.value !== "") {
      digitMayor2.current.disabled = true;
      digitMayor1.current.disabled = true;

      try {
        let data = `${digitMayor1.current.value}${digitMayor2.current?.value}`;

        const result = await api.get(`/api/v1/candidate/bydigit/${data}`);

        if (result.status === 200) {
          setCandidatoPrefeito(result.data.candidato);
          setComplement(true);
          setError(false);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError(true);
          } else if (error.response.status === 500) {
              toast.error(error.response.data.message);
          }
        } else {
            toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      }
    }
  }

  const handleConfirm = useCallback(async (type) => {
    confirmRef.current.play();
    setComplement(false);
    if (type === 'prefeito') {
      
      try {
        let id = candidatoPrefeito.id || null;
        let tipo = candidatoPrefeito.tipoCandidato || 1;
        let isNulo = id === null;
        setLoading(true);
        const result = await api.post('api/v1/vote/PostVote', { candidatoId: id, type:tipo, isNulo});
        
        if (result.status === 201) {
          setStep(prev => prev + 1);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          }
        } else {
          toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      } finally {
        setLoading(false);
        setValuesMayor(["",""]);
      }
    } else if (type === 'vereador') {
      
      try {
        let id = candidatoVereador.id || null;
        let tipo = candidatoVereador.tipoCandidato || 2;
        let isNulo = id === null;
        setLoading(true);
        const result = await api.post('api/v1/vote/PostVote', { candidatoId: id, type: tipo, isNulo});
        
        if (result.status === 201) {
          setStep(prev => prev + 1);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
            toast.error(error.response.data.message);
          }
        } else {
          toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      } finally {
        setValuesVereador(["","", "", "", ""]);
        setLoading(false);
      }

    }


  }, [confirmRef, candidatoPrefeito, candidatoVereador]);

  const handleCorrection = useCallback((type) => {  
    if (type === 'prefeito') {
      setComplement(false);
      digitMayor2.current.disabled = false;
      digitMayor1.current.disabled = false;
      digitMayor1.current.focus();

      if (error === true) {
        setError(false);
      }
      setCandidatoPrefeito({});
      setValuesMayor(["",""]);
    }
    if (type === 'vereador') {
      setComplement(false);
      digitVereador1.current.disabled = false;
      digitVereador2.current.disabled = false;
      digitVereador3.current.disabled = false;
      digitVereador4.current.disabled = false;
      digitVereador5.current.disabled = false;

      if (error === true) {
        setError(false);
      }
      setCandidatoVereador({});
      setValuesVereador(["","", "", "", ""]);
      digitVereador1.current.focus();
    }
  }, [digitMayor1, digitMayor2, digitVereador1, complement, error]);

  const handleAnnulment = useCallback(async () => {
    
    setComplement(false);
    setError(false);
    confirmRef.current.play();

    if (step === 1) {
      try {
        const result = await api.post('api/v1/vote/PostVote', { type: 1, candidatoId: null});

        if (result.status === 201) {
          setStep(prev => prev + 1);
        }
        
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
              toast.error(error.response.data.message);
          }
        } else {
            toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      }
    }

    if (step === 2) {
      try {
        const result = await api.post('api/v1/vote/PostVote', { type: 2, candidatoId: null});

        if (result.status === 201) {
          setStep(prev => prev + 1);
        }
        
      } catch (error) {
        if (error.response) {
          if (error.response.status === 500) {
              toast.error(error.response.data.message);
          }
        } else {
            toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      }
    }

  }, [step, confirmRef])

  localStorage.clear();
  
  return (
    <>
    <Loading load={loading} />
    {step === 0 &&
      <div className="d-flex flex-column justify-content-center align-items-center align-content-center content">
        <img src={Logo} alt="Eleições 2020" className="logo"/>
        <h1>Seja bem vindo cidadão.</h1>
        <p>Seja inteligente vote consciente!</p>
        <div className="buttons">
          <button className="btn btn-primary mr-2" onClick={() => setStep(prev => prev+1)}>Iniciar</button>
          <button className="btn btn-secondary" onClick={() => history.push('/apuracao')}>Ver Apuração</button>
        </div>
      </div>
    }
    {step === 1 &&
      <PrefeitoContainer 
        onChange={handleValueMayor}
        candidatoPrefeito={candidatoPrefeito} 
        complement={complement} 
        error={error}
        values={valuesMayor}
        ref1={digitMayor1}
        ref2={digitMayor2}
        confirm={handleConfirm}
        correction={handleCorrection}
        annulment={handleAnnulment}
      />
    }
    {
      step === 2 &&
        <VereadorContainer
         complement={complement}
         onChange={handleValueVereador}
         candidatoVereador={candidatoVereador}
         error={error}
         value={valuesVereador}
         ref1={digitVereador1}
         ref2={digitVereador2}
         ref3={digitVereador3}
         ref4={digitVereador4}
         ref5={digitVereador5}
         confirm={handleConfirm}
         correction={handleCorrection}
         annulment={handleAnnulment}
         values={valuesVereador}
        
        />
    }
    {
      step === 3 &&
        <div className="d-flex flex-column justify-content-center align-items-center align-content-center content mb-5 p-5">
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