import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import api from 'services/api';

import Loading from 'components/Loading';
import InputText from 'components/Input';
import SelectInput from 'components/Select';

const CandidateForm = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  const clearForm = () => {
    setValues({});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (values.password !== values.confirmPassword) {
      toast.error('Senhas divergentes.');
      setLoading(false);
      return;
    }

    const data = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      password: values.password,
      endereco: values.endereco,
      CEP: values.cep,
      numero: values.numero,
      cidade: values.cidade,
      estado: values.estado
    }

    try {
      const response = await api.post('users/CandidateForm', data);

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
    const {name, value} = e.target;

    setValues(prev => ({...prev, [name]: value}));
  }, [])
  return (
    <>
      <Loading load={loading}/>
      <main className="container-fluid">
        <h3 className="mt-3 title">Cadastro de Candidato </h3>
        <p className="text-info">
          Verifique cada campo com os dados digitados antes do cadastro.
        </p>
        <form className="form-new card mt-3 py-3 px-5 row" onSubmit={handleSubmit}>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Dash
          </Link>
          <InputText 
            label="Nome do completo" 
            type="text"
            onChange={handleChange}
            required
            name="nomeCompleto"
            value={values.nomeCompleto}
          />
          <InputText 
            label="Legenda" 
            type="text"
            onChange={handleChange}
            value={values.legenda}
            name="legenda"
            required
          />
          <SelectInput 
            label="Tipo de candidato" 
            onChange={handleChange}
            value={values.tipoCandidato}
            options={[{label: 'Prefeito', value: 1}, {label: 'Vereador', value: 2}]}
            required
          />
          {
            values.tipoCandidato === 1 &&
              <InputText 
                label="Nome do vice"
                type="text"
                onChange={handleChange}
                value={values.nomeVice}
                name="nomeVice"
              />
          }
          <InputText 
            label="Dígito" 
            type="text"
            onChange={handleChange}
            value={values.digito}
            required
            maxLength={values.digito === 1 ? 2 : 5}
            name="digito"
          />
          <InputText 
            label="Foto candidato" 
            type="file"
            onChange={handleChange}
            value={values.fotoCandidato}
            name="fotoCandidato"
          />
           {
            values.tipoCandidato === 1 &&
              <InputText 
                label="Foto do vice"
                type="file"
                onChange={handleChange}
                value={values.fotoVice}
                name="fotoVice"
              />
          }
          <div className="buttons">
            <button className="btn btn-secondary" type="button" onClick={clearForm}>Limpar campos</button>
            <button className="btn btn-primary" type="submit">Salvar</button>
          </div>
        </form>
      </main>
    </>
  )
}

export default CandidateForm;