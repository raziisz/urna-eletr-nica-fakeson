import React, { useState, useEffect, useCallback } from 'react';

import { FiPlusCircle } from 'react-icons/fi';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from 'components/Loading';
import CandidateItem from 'components/CandidateItem';
import ButtonLogout from 'components/ButtonLogout';

import './styles.css';
import api from 'services/api';


export default () => {
  const history = useHistory();
  const [candidates, setCandidates] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itensPerPage: 10,
    totalItens: 0,
    totalPages: 0
  })
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState(0);

  useEffect(() => {

    setLoading(prev => !prev);
    loadCandidates();
    setLoading(prev => !prev);

  }, []);
  
  const handleAdd = () => {
    history.push('/admin/candidate');
  }

  const handleFilter = async (e) => {
    setLoading(prev => !prev);

    let { value } = e.target;
    value = parseInt(value);
    
    setFilterType(value);
    await loadCandidates(value);
    
    setLoading(prev => !prev);

  }

  const handlePage = async (e, value) => {
    const page = parseInt(value);

    setLoading(prev => !prev);

    await loadCandidates(filterType, page);

    setLoading(prev => !prev);
  }

  const loadCandidates = async (type = 0, page = 1) => {
    return api.get('api/v1/candidate', { 
      params: {
        type: type,
        pageNumber: page
       }
    })
      .then(response => {
        const pag = JSON.parse(response.headers.pagination);
        setPagination(pag);
        return response.data
      })
      .then(data => setCandidates(data.candidatos))
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
              toast.error(error.response.data.message);
          } else if (error.response.status === 500) {
              toast.error(error.response.data.message);
          }
        } else {
            toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      });
  }

  const handleEdit = useCallback((id) => {
    history.push(`/admin/candidate?id=${id}`);
  }, []);

  const handleDelete = useCallback(async (id) => {
    setLoading(prev => !prev);
    let confirm = window.confirm("Você tem certeza que quer excluir este candidato?");

    if (!!confirm) {  
      try {
        const result = await api.delete(`api/v1/candidate/DeleteCandidate/${id}`);

        if (result.status === 204) {
          toast.info('Candidato removido com sucesso!');
          setCandidates(prev => [...prev.filter(x => x.id !== id)]);
        }
        
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
              toast.error(error.response.data.message);
          } else if (error.response.status === 404) {
            toast.error(error.response.data.message);
          } else if (error.response.status === 500) {
              toast.error(error.response.data.message);
          }
        } else {
            toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      }
      

    }

    setLoading(false);
  }, [])
  return (
    <>
      <Loading load={loading}/>
      <div id="page-admin" className="container">
        <main className="pb-5">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="title-admin">Painel administrativo - ELEIÇÕES 2020</h3>
            <ButtonLogout />
          </div>
          <div className="d-flex d-flex justify-content-between mb-3">
            <div className="select-input">
              <label htmlFor="type">Tipo de candidatura: </label>
              <select value={filterType} onChange={handleFilter} name="type" className="form-control ">
                <option value="0">TODOS</option>
                <option value="1">PREFEITO</option>
                <option value="2">VEREADOR</option>
              </select>
            </div>
            <button className="btn btn-sm btn-primary" onClick={handleAdd}>
              <FiPlusCircle />
            </button>
          </div>
        { candidates.length > 0 ? (candidates.map(x => (
          <CandidateItem data={x} key={x.id} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))) : 
          (<div className="row mt-2 mb-2 none">
            <h3>Sem candidatos cadastrados...</h3>
          </div>)}
          {(candidates.length > 0 && pagination.totalItens > 0) && 
          <div className="d-flex d-flex justify-content-center mb-5">
                <Pagination count={pagination.totalPages} onChange={handlePage} color="primary" hidePrevButton hideNextButton/>
          </div>}

        </main>
      </div>
    </>
  )
}