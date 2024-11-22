import React, { useEffect } from 'react';

function MyInterests() {

  useEffect(() => {
    if (!localStorage.getItem("token")) {
       window.location.href = 'http://localhost:3000/Login'; 
    }     
  })

  return (
    <div>Meus Interesses</div>
  )
}

export default MyInterests