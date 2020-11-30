import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import api, { baseURL } from 'services/api';

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
  const [previewFotoCandidato, setPreviewFotoCandidato] = useState('');
  const [fotoVice, setFotoVice] = useState('');
  const [previewFotoVice, setPreviewFotoVice] = useState('');
  
  const history = useHistory();
  
  const setQuery = () => {
    return new URLSearchParams(history.location.search);
  }
  
  useEffect(() => {
    const query =  setQuery();
    const id  = query.get('id');
    
    if (id) {
      setLoading(prev => !prev); 
      api.get('api/v1/candidate/' + id)
        .then(response => {
          const value = response.data.candidato;

          let candidatoEdit = {
            id: value.id,
            digito: value.digito,
            dataRegistro: value.dataRegistro,
            legenda: value.legenda,
            nomeCompleto: value.nomeCompleto,
            nomeVice: value.nomeVice,
            tipoCandidato: value.tipoCandidato,
          }

          let fotoPrev1 = `${baseURL}/images/${value.fotoCandidato}`;
          let fotoPrev2 = `${baseURL}/images/${value.fotoVice}`;

          setValues(candidatoEdit);
          setPreviewFotoCandidato(fotoPrev1);
          setPreviewFotoVice(fotoPrev2);
        })
        .catch(error => {
          console.log(error)
          if (error.response) {
            if (error.response.status === 404) {
                toast.error(error.response.data.message);
            } else if (error.response.status === 500) {
                toast.error(error.response.data.message);
            }
          } else {
              toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
          }
        })
        .finally((_) => setLoading(prev => !prev));
    }
  }, [])
  const clearForm = () => {
    setValues({});
    setPreviewFotoCandidato('');
    setPreviewFotoVice('');
    setFotoCandidato('');
    setFotoVice('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (values.tipoCandidato == 1) {
      if (values.digito.length < 2) {
        toast.error('Os digitos do candidato deve conter 2 dígitos!');
      }
    } else {
      if (values.digito.length < 5) {
        toast.error('Os digitos do candidato deve conter 5 dígitos!');
      }
    }
    let formData = new FormData();
    formData.append('nomeCompleto', values.nomeCompleto);
    formData.append('legenda', values.legenda);
    formData.append('tipoCandidato', values.tipoCandidato);
    formData.append('digito', values.digito);
    
    if (fotoCandidato != '') {
      formData.append('fotoCandidato', fotoCandidato);
    }
    
    if (values.tipoCandidato == 1) {
      if(fotoVice != '') {
        formData.append('fotoVice', fotoVice);
      }
      formData.append('nomeVice', values.nomeVice);
    }

    try {
      if(values.id) {
        const response = await api.put(`api/v1/candidate/EditCandidate/${values.id}`, formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        });

        if (response.status === 204) {
          toast.info('Atualização realizada com sucesso!');
          setLoading(false);
          history.push('/admin');
          return;
        }
      } else {
        const response = await api.post('api/v1/candidate/PostCandidate', formData, {
          headers: {
            ContentType: 'multipart/form-data'
          }
        });
  
        if (response.status === 200) {
          toast.info(response.data.message);
          setLoading(false);
          history.push('/admin');
          return;
        }
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
      setFotoCandidato(files[0]);
      setPreviewFotoCandidato(URL.createObjectURL(files[0]));

    } else if (name === 'fotoVice') {
      setFotoVice(files[0]);
      setPreviewFotoVice(URL.createObjectURL(files[0]));
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
      <main className="container-fluid mb-5">
        <h3 className="mt-3 title">{values.id ? "Edição" : "Cadastro"} de Candidato </h3>
        <p className="text-info">
          Verifique cada campo com os dados digitados antes de salvar.
          <br/>
          {values.id ?  "Na edição você não pode alterar os campos dígitos e tipo de candidato." : "Após salva-los você não poderá alterar tipo de candidato e nem digito."}
        </p>
      
        <form className="card mt-3 py-3 px-5 row" onSubmit={handleSubmit}>
          <Link to="/admin" className="mb-3">
            <FiArrowLeft />
            Voltar para painel
          </Link>
          <InputText
            classList="form-control" 
            label="Nome do completo *" 
            type="text"
            onChange={e => handleChange(e)}
            required
            name="nomeCompleto"
            value={values.nomeCompleto}
          />
          <InputText 
            classList="form-control" 
            label="Legenda *" 
            type="text"
            onChange={e => handleChange(e)}
            value={values.legenda}
            name="legenda"
            required
          />
          <SelectInput
            disabled={values.id}
            classList="form-control"  
            label="Tipo de candidato *" 
            onChange={e => handleChange(e)}
            value={values.tipoCandidato}
            options={[{label: 'Prefeito', value: 1}, {label: 'Vereador', value: 2}]}
            required
            name="tipoCandidato"
          />
          {
            values.tipoCandidato == 1 &&
              <InputText
                classList="form-control"  
                label="Nome do vice *"
                type="text"
                onChange={e => handleChange(e)}
                value={values.nomeVice}
                name="nomeVice"
              />
          }
          <InputText
            classList="form-control"  
            label="Dígito *" 
            type="text"
            onChange={e => handleChange(e)}
            value={values.digito}
            required
            maxLength={values.tipoCandidato == 1 ? 2 : 5}
            minLength={values.tipoCandidato == 1 ? 2 : 5}
            name="digito"
            disabled={values.id}
          />
          <InputText
            classList="form-control-file"  
            label={ values.id ? "Foto candidato" : "Foto candidato *"} 
            type="file"
            onChange={e => handleChange(e)}
            name="fotoCandidato"
            accept="image/*"
          
          >
          {previewFotoCandidato.length > 0 ? (
            <img src={previewFotoCandidato} className="mt-2 mb-2 imgup img-thumbnail" alt="Imagem escolhida candidato" />
        ) : (
                <div></div>
            )}
          </InputText>
           {
            values.tipoCandidato == 1 &&
              <InputText
                classList="form-control-file" 
                label={values.id ? "Foto vice" : "Foto vice *"}
                type="file"
                onChange={e => handleChange(e)}
                name="fotoVice"
                accept="image/*"
                
              >
                {previewFotoVice.length > 0 ? (
                      <img src={previewFotoVice} className="mt-2 mb-2 imgup img-thumbnail" alt="Imagem escolhida vice" />
                  ) : (
                          <div></div>
                      )}
                </InputText>
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