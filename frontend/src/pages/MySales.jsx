import React, { useEffect } from 'react';

function MySales() {

  useEffect(() => {
    if (!localStorage.getItem("token")) {
       window.location.href = 'http://localhost:3000/Login'; 
    }     
  })

  return (
    <div>Minhas Vendas</div>
  )
}

export default MySales