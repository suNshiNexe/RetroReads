import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/MyAccount/myAccount.css';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userId = localStorage.getItem('user_id'); // Pega o userId do localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erro ao carregar os dados do usuário');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>Informações sobre minha conta</h1>
      <div className="profile-info">
        <div className="profile-info-header">
          <div className="user-name">{userData.USER_NM}</div>
          <img
            src='../assets/img/companylogo@2x.png'
            alt="Foto de perfil"
            className="user-photo"
          />
        </div>
        <div className="profile-info-section">
          <div>
            <strong>Nome:</strong> {userData.USER_NM}
          </div>
          <div>
            <strong>E-mail:</strong> {userData.USER_EMAIL}
          </div>
          <div>
            <strong>Telefone:</strong> {userData.USER_FN}
          </div>
          {/* Adicione outros campos conforme necessário */}
        </div>
      </div>

      <div className="profile-actions">
        <button>Editar Perfil</button>
        <button>Salvar Alterações</button>
      </div>
    </div>
  );
};

export default UserProfile;