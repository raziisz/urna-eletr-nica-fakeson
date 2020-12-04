import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Loading from 'components/Loading';
import CandidateItemQtd from 'components/CandidateItemQtd';

import api from 'services/api';

import './styles.css';

export default () => {
  const [loading, setLoading] = useState(false);
  const [candidatos, setCandidatos] = useState([]);
  const [brancos, setBrancos] = useState([]);
  const [nulos, setNulos] = useState([]);
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    setLoading(true);

    api.get('api/v1/vote/getvotos', { params: { type: filter}})
      .then(response => {
        setCandidatos(response.data.votes);
        setBrancos(response.data.brancos);
        setNulos(response.data.nulls);
      })
      .catch(error => {
        if (error?.response?.status === 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Ops! Sem conexão com a base de dados.\n Tente novamente em alguns instantes.');
        }
      })
      .finally((_) => setLoading(false));
  }, [filter]);
  
  const orderDesc = function (a,b) {
    return b.votosRecebidos.length - a.votosRecebidos.length;
  }

  let prefeitos = candidatos.filter(x => x.tipoCandidato === 1).sort(orderDesc);
  let vereadores = candidatos.filter(x => x.tipoCandidato === 2).sort(orderDesc);
  let votoPrefeitoNulos = nulos.filter(x => x.type === 1).length;
  let votoVereadorNulos = nulos.filter(x => x.type === 2).length;
  let votoPrefeitoBrancos = brancos.filter(x => x.type === 1).length;
  let votoVereadorBrancos = brancos.filter(x => x.type === 2).length;

  return (
    <>
      <Loading load={loading}/>
      <div id="page-canvas" className="container">
        <main className="pb-5">
          <div className="d-flex justify-content-between align-items-center mb-5 mt-5 pb-3">
            <Link to="/" className="seta">
              <FiArrowLeft  color="#3364FF" size={36} />
              Voltar inicio
            </Link>
            <h3 className="title-admin">APURAÇÃO DE VOTOS - ELEIÇÕES 2020</h3>
          </div>

          <div className="d-flex mb-4 mt-2">
            <label className="mr-2 mt-1">Filtrar por:</label>
            <select className="form-control w-25" value={filter} onChange={(e) => setFilter(parseInt(e.target.value))}>
              <option value="0">TODOS</option>
              <option value="1">PREFEITO</option>
              <option value="2">VEREADOR</option>
              <option value="3">BRANCOS/NULOS</option>
            </select>
          </div>

         {(filter === 0 || filter === 1) && (
           <>
            <h5 className="text-primary mb-4">APURAÇÃO DE VOTOS PREFEITO</h5>
              <div className="card mb-5">
                <div className="card-body px-5  py-4">
                  <div className="row bg-success text-white  py-2 text-center row-border">
                    <div className="col-sm-3">
                      Candidato
                    </div>
                    <div className="col-sm-3">
                      Dígito
                    </div>
                    <div className="col-sm-3">
                      Legenda
                    </div>
                    <div className="col-sm-3">
                      Quantidade de Votos
                    </div>
                  </div>
                  {prefeitos.length > 0 ? prefeitos.map(candidato => 
                    <CandidateItemQtd candidato={candidato} key={candidato.id} />
                  ) : <div className="d-flex justify-content-center mt-2 mb-5">
                    Sem dados
                  </div>
                  }
                </div>
              </div>
            </>)}
          
          { (filter === 0 || filter === 2) &&
            <>
            <h5 className="text-primary mb-4">APURAÇÃO DE VOTOS VEREADOR</h5>
          <div className="card mb-5">
            <div className="card-body px-5 py-4">
              <div className="row bg-primary text-white  py-2 text-center row-border">
                <div className="col-sm-3">
                  Candidato
                </div>
                <div className="col-sm-3">
                  Dígito
                </div>
                <div className="col-sm-3">
                  Legenda
                </div>
                <div className="col-sm-3">
                  Quantidade de Votos
                </div>
              </div>
              {vereadores.length > 0 ? vereadores.map(candidato => 
                <CandidateItemQtd candidato={candidato} key={candidato.id} />
              ) : <div className="d-flex justify-content-center mt-2 mb-5">
              Sem dados
            </div>
              }
            </div>
          </div>
          </>
          }

          {
            (filter === 0 || filter === 3) &&
            <>
            <h5 className="text-primary mb-4">VOTOS NULOS</h5>
          <div className="card">
            <div className="card-body px-5 py-4">
              <div className="row bg-secondary text-white  py-2 text-center row-border">
                <div className="col-sm-3">
                  Quantidade de votos brancos prefeitos
                </div>
                <div className="col-sm-3">
                  Quantidade de votos brancos vereadores
                </div>
                <div className="col-sm-3">
                  Quantidade de votos nulos prefeitos
                </div>
                <div className="col-sm-3">
                  Quantidade de votos nulos vereadores
                </div>
              </div>
              <div className="row text-center py-2 row-border-child">
                <div className="col-sm-3">
                  {votoPrefeitoBrancos}
                </div>
                <div className="col-sm-3">
                  {votoVereadorBrancos}
                </div>
                <div className="col-sm-3">
                  {votoPrefeitoNulos}
                </div>
                <div className="col-sm-3">
                  {votoVereadorNulos}
                </div>
              </div>
            </div>
          </div>
          </>
          }
        {/* { candidates.length > 0 ? (candidates.map(x => (
          <CandidateItem data={x} key={x.id} handleEdit={handleEdit} handleDelete={handleDelete} />
        ))) : 
          (<div className="row mt-2 mb-2 none">
            <h3>Sem candidatos cadastrados...</h3>
          </div>)}
          {(candidates.length > 0 && pagination.totalItens > 0) && 
          <div className="d-flex d-flex justify-content-center mb-5">
                <Pagination count={pagination.totalPages} onChange={handlePage} color="primary" hidePrevButton hideNextButton/>
          </div>} */}

        </main>
      </div>
    </>
  )
}