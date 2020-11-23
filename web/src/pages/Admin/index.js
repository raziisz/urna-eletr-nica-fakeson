import React from 'react';
import Jessy from 'assets/images/jessy.jpg';
import { FiEdit, FiTrash, FiPlusCircle } from 'react-icons/fi';
import { Pagination } from '@material-ui/lab';
import { Modal } from '@material-ui/core';
import './styles.css';


export default () => {
  return (
    <div id="page-admin" className="container">
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
          <button className="btn btn-sm btn-primary">
            <FiPlusCircle />
          </button>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-sm-1">
            <img src={Jessy} alt="Amorzão"/>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
                <span className="title-span">Nome Completo:</span>
                <span className="text-span">Geciene Colares</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Tipo de candidatura:</span>
                <span className="text-span">Prefeito</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Nome do Vice:</span>
                <span className="text-span">Felipe Libertinni</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Legenda:</span>
               <span className="text-span">Juntos podemos!</span>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span>Ações</span>
              <div className="btn-group btn-group-sm">
                <button className="btn btn-secondary">
                  <FiEdit />
                </button>
                <button className="btn btn-danger">
                  <FiTrash />
                </button>
                
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-sm-1">
            <img src={Jessy} alt="Amorzão"/>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
                <span className="title-span">Nome Completo:</span>
                <span className="text-span">Geciene Colares</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Tipo de candidatura:</span>
                <span className="text-span">Vereador</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Legenda:</span>
               <span className="text-span">Juntos podemos!</span>
            </div>
          </div>
          <div className="col-sm-3 offset-sm-2">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span>Ações</span>
              <div className="btn-group btn-group-sm">
                <button className="btn btn-secondary">
                  <FiEdit />
                </button>
                <button className="btn btn-danger">
                  <FiTrash />
                </button>
                
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <div className="col-sm-1">
            <img src={Jessy} alt="Amorzão"/>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
                <span className="title-span">Nome Completo:</span>
                <span className="text-span">Geciene Colares</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Tipo de candidatura:</span>
                <span className="text-span">Prefeito</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Nome do Vice:</span>
                <span className="text-span">Felipe Libertinni</span>
            </div>
          </div>
          <div className="col-sm-2">
            <div className="d-flex flex-column">
            <span className="title-span">Legenda:</span>
               <span className="text-span">Juntos podemos!</span>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="title-span">Ações</span>
              <div className="btn-group btn-group-sm">
                <button className="btn btn-secondary">
                  <FiEdit />
                </button>
                <button className="btn btn-danger">
                  <FiTrash />
                </button>
                
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex d-flex justify-content-center">
              <Pagination count={10} color="primary" hidePrevButton hideNextButton onChange={() => {}} />
        </div>

      </main>
    </div>
  )
}