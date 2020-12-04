import React from 'react';
import './styles.css'

export default () => {

  return  (
    <div className="d-flex justify-content-center mt-2 pt-5">
      <p>  <span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Desenvolvido por <span class="detail">Felipe Libertini - Desenvolvedor de Software</span></p>
    </div>
  )
  
}