import React, { useState, useEffect } from 'react';
import Jessy from 'assets/images/jessy.jpg';

import { FiEdit, FiTrash, FiPlusCircle } from 'react-icons/fi';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Loading from 'components/Loading';
import CandidateItem from 'components/CandidateItem';

import './styles.css';
import api from 'services/api';


export default () => {
  const history = useHistory();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    setLoading(prev => !prev);
    api.get('/candidate')
      .then(response => response.data)
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

    setLoading(false);

  }, [])
  
  const handleAdd = () => {
    history.push('/admin/candidate');
  }
  return (
    <div id="page-admin" className="container">
      <Loading load={loading}/>
      <main>
        <h3 className="title-admin">Painel administrativo - ELEIÇÕES 2020</h3>
        <div className="d-flex d-flex justify-content-between mb-3">
          <div className="select-input">
            <label htmlFor="type">Tipo de candidatura: </label>
            <select value="0" name="type" className="form-control ">
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
         <CandidateItem data={x} key={x.id}/>
       ))) : 
        (<div className="row mt-2 mb-2 none">
          <h3>Sem candidatos cadastrados...</h3>
        </div>)}
        {candidates.length > 0 && 
        <div className="d-flex d-flex justify-content-center">
              <Pagination count={10} color="primary" hidePrevButton hideNextButton onChange={() => {}} />
        </div>}

      </main>
    </div>
  )
}