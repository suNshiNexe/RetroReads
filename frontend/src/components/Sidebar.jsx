import { Link, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import classNames from 'classnames';
import '../css/global.css';
import styles from '../css/Sidebar/sidebar.module.css';

const SidebarDefault = ({ className = "" }) => {
  const location = useLocation();

  useEffect(() => {
    const sidebar = document.querySelector(`.${styles.menuList}`);
    if (sidebar) {
      sidebar.onclick = function() {
        sidebar.classList.toggle('styles.active');
      };
    }
  }, []);

  return (
    <nav className={classNames(styles.sidebarDefault, className)}>
      <div className={styles.sidebar}>
        <ul className={styles.menuList}>
          <li className={classNames({ [styles.menuItemActive]: location.pathname === "/" })}>
            <a href="/" className={styles.iconLink}>
              <img src="/assets/icons/catalog-icon.svg" alt="catálogo" />
            </a>
          </li>
          <li className={classNames({ [styles.menuItemActive]: location.pathname === "/my-interests" })}>
            <a href="/my-interests" className={styles.iconLink}>
              <img src="/assets/icons/interest-icon.svg" alt="meus interesses" />
            </a>
          </li>
          <li className={classNames({ [styles.menuItemActive]: location.pathname === "/my-shelf" })}>
            <a href="/my-shelf" className={styles.iconLink}>
              <img src="/assets/icons/shelf-icon.svg" alt="minha estante" />
            </a>
          </li>
          <li className={classNames({ [styles.menuItemActive]: location.pathname === "/my-sales" })}>
            <a href="/my-sales" className={styles.iconLink}>
              <img src="/assets/icons/for-sale-icon.svg" alt="minhas vendas" />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

SidebarDefault.propTypes = {
  className: PropTypes.string,
};

export default SidebarDefault;