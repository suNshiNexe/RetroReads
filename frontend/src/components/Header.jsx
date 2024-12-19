import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import classNames from 'classnames';
import styles from "../css/Header&Footer/header.module.css";
import '../css/global.css'
import { logout } from '../pages/Login'
import LogoutAlert from '../components/LogoutAlert'; // Componente de alerta personalizado

const HeaderDefault = ({ className = "" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ user_nm: '' });
  const [showLogoutAlert, setShowLogoutAlert] = useState(false); // Controle do alerta //(TESTE, REMOVER DPS)
  const location = useLocation();

  // Verifica se a rota atual é login ou signup
  const hideSearchBar = ["/login", "/signup"].includes(location.pathname.toLowerCase());

  // Verifica se o usuário está logado 
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  // Função para carregar o nome do usuário no header
  useEffect(() => {
    const storedUserName = localStorage.getItem('user_name');
    if (storedUserName) {
      const names = storedUserName.split(' ');
      const firstName = names[0];
      const secondName = names[1] || '';
      setUser({ user_nm: `${firstName} ${secondName}`.trim() });
    }
  }, [location.pathname]);


  //remover dps (testes)
  // Função para mostrar o alerta de logout
  const handleLogoutClick = () => {
    setShowLogoutAlert(true); // Exibe o alerta (testes)
  };

  // Função para confirmar o logout
  const handleConfirmLogout = () => {
    setShowLogoutAlert(false); // Oculta o alerta (testes)
    logout(); // Executa o logout
  };

  // Função para cancelar o logout
  const handleCancelLogout = () => {
    setShowLogoutAlert(false); // Oculta o alerta sem fazer logout (testes)
  }; 
 
  return (
    <header className={classNames(styles.headerDefault, className)}>
      <section className={styles.header}>

        {/* Logo e Nome da Empresa */}
        <div className={styles.brand}>
          <a href='/'><img className={styles.companyLogoIcon} alt="Company Logo" src="/assets/img/companylogo@2x.png" loading='lazy'/></a>
          <h1 className={styles.companyName}>
            <Link to="/" className={styles.companyNameLink}>RetroReads</Link>
          </h1>
        </div>

        {/* Barra de Pesquisa */}
        {!hideSearchBar && (
          <div className={styles.searchBarContainer}>
            <form className={styles.searchBar} role="search">
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Pesquisar..."
              />
              <button type="submit" className={styles.searchIconWrapper}>
                <img className={styles.searchIcon} alt="Ícone de Pesquisa" src="/assets/icons/search-icon.svg" />
              </button>
            </form>
          </div>
        )}

        {/* Ícones de Login/Logout e Criar Conta*/}
        <div className={styles.accountWrapper}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={styles.label}>
                <span>Entrar</span>
              </Link>
              <p>|</p>
              <Link to="/signup" className={styles.label}>
                <span>Criar Conta</span>
              </Link>
            </>
          ) : (
            <>
              {/* Ícone de perfil */}
              <Link to="/my-account" className={styles.loggedContainer}>
                <img className={styles.accountIcon} alt="Ícone de Perfil" src="/assets/icons/account-icon.svg" loading='lazy' />
                <span className={styles.label}>{user.user_nm}</span>
              </Link>
              <p>|</p>
              {/* Botão de Logout que é mostrado apenas quando a pessoa estiver logada */}
              {/* <button onClick={ logout } className={styles.logoutButton}> */}
              <button onClick={handleLogoutClick} className={styles.logoutButton}>
                <span className={styles.label}>Sair</span>
              </button>
            </>
          )}
        </div>
      </section>
      <LogoutAlert //teste remover dps
        show={showLogoutAlert} // Controla a visibilidade do alerta
        onConfirm={handleConfirmLogout} // Confirma o logout
        onCancel={handleCancelLogout} // Cancela o logout
        />
    </header>
  );
};

HeaderDefault.propTypes = {
  className: PropTypes.string,
};

export default HeaderDefault;