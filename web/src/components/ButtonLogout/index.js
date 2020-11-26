import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import { logout } from 'services/auth';
import { useHistory } from 'react-router-dom';


export default () => {
  const history = useHistory();

  const handleLogout = () => {
    logout();

    history.push('/login');
  }

  return <button className="btn btn-outline-danger pb-2 mb-2" onClick={handleLogout} >
            SAIR <i> <FiLogOut /></i>
          </button>
}