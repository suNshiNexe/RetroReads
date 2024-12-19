import React from 'react';
import '../css/Modals/LogoutAlert/logoutAlert.css'; // Certifique-se de importar o arquivo CSS com

const LogoutAlert = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="alert-overlay">
      <div className="alert-box">
        <h2>Confirmar Logout</h2>
        <p>Tem certeza de que deseja sair da sua conta?</p>
        <div>
          <button onClick={onConfirm}>Sim</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutAlert; // Certifique-se de exportar o componente