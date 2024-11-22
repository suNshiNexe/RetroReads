import React from 'react';
import { Navigate } from 'react-router-dom';

/* Função para proteger visualizações antecipadas antes do token ser verificado, ou seja, 
redirecionamento e renderização apropriados caso usuários não autenticados tentem visualizar páginas que só podem ser acessadas quando logados */

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute; 
