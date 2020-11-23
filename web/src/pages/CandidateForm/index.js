import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import api from 'services/api';

import Loading from 'components/Loading';
import InputText from 'components/Input';
import SelectInput from 'components/Select';

const initialValuesCandidate = {
  legenda: "",
  tipoCandidato: "",
  nomeVice: "",
  digito: "",
  nomeCompleto: ""
}

const CandidateForm = () => {
  const [values, setValues] = useState(initialValuesCandidate);
  const [loading, setLoading] = useState(false);
  const [fotoCandidato, setFotoCandidato] = useState('');
  const [fotoVice, setFotoVice] = useState('');
  
  const history = useHistory();


  const clearForm = () => {
    setValues({});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append('nomeCompleto', values.nomeCompleto);
    formData.append('legenda', values.legenda);
    formData.append('tipoCandidato', values.tipoCandidato);
    formData.append('digito', values.digito);
    formData.append('fotoCandidato', fotoCandidato);
    if (values.tipoCandidato == 1) {
      formData.append('fotoVice', fotoVice);
      formData.append('nomeVice', values.nomeVice);
    }

    try {
      const response = await api.post('candidate/PostCandidate', formData, {
        headers: {
          ContentType: 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        toast.info(response.data.message);
        setLoading(false);
        history.push('/');
        return;
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
            toast.error(error.response.data.message);
        } else if (error.response.status === 500) {
            toast.error(error.response.data.message);
        }
      } else {
          toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
      }
      setLoading(false);
    }

  }

  const handleChange = useCallback((e) => {
    let {name, value, files} = e.target;

    if (name === 'fotoCandidato') {
      setFotoCandidato(files[0])
    } else if (name === 'fotoVice') {
      setFotoVice(files[0])
    } else if (name === 'digito') {
      let regex = /[^0-9]/g;
      let newValue = value.replace(regex, "");
      setValues(prev => ({...prev, [name]: newValue}));
    } else {
      setValues(prev => ({...prev, [name]: value}));
    }

  }, [])
  return (
    <>
      <Loading load={loading}/>
      <main className="container-fluid">
        <h3 className="mt-3 title">Cadastro de Candidato </h3>
        <p className="text-info">
          Verifique cada campo com os dados digitados antes de salvar.
        </p>
        <form className="card mt-3 py-3 px-5 row" onSubmit={handleSubmit}>
          <Link to="/admin" className="mb-3">
            <FiArrowLeft />
            Voltar para painel
          </Link>
          <InputText 
            label="Nome do completo" 
            type="text"
            onChange={e => handleChange(e)}
            required
            name="nomeCompleto"
            value={values.nomeCompleto}
          />
          <InputText 
            label="Legenda" 
            type="text"
            onChange={e => handleChange(e)}
            value={values.legenda}
            name="legenda"
            required
          />
          <SelectInput 
            label="Tipo de candidato" 
            onChange={e => handleChange(e)}
            value={values.tipoCandidato}
            options={[{label: 'Prefeito', value: 1}, {label: 'Vereador', value: 2}]}
            required
            name="tipoCandidato"
          />
          {
            values.tipoCandidato == 1 &&
              <InputText 
                label="Nome do vice"
                type="text"
                onChange={e => handleChange(e)}
                value={values.nomeVice}
                name="nomeVice"
              />
          }
          <InputText 
            label="Dígito" 
            type="text"
            onChange={e => handleChange(e)}
            value={values.digito}
            required
            maxLength={values.tipoCandidato == 1 ? 2 : 5}
            name="digito"
          />
          <InputText 
            label="Foto candidato" 
            type="file"
            onChange={e => handleChange(e)}
            value={fotoCandidato}
            name="fotoCandidato"
          />
           {
            values.tipoCandidato == 1 &&
              <InputText 
                label="Foto do vice"
                type="file"
                onChange={e => handleChange(e)}
                value={fotoVice}
                name="fotoVice"
              />
          }
          <div className="buttons">
            <button className="btn btn-secondary" type="button" onClick={clearForm}>Limpar campos</button>
            <button className="btn btn-primary mr-2" type="submit">Salvar</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default CandidateForm;