import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from 'routes/router'
import Footer from 'components/Footer';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes />
      <Footer />
    </>
  );
}

export default App;
