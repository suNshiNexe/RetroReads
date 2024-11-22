import PropTypes from "prop-types";
import classNames from 'classnames';
import { useState } from 'react';
import '../css/global.css';
import styles from '../css/Header&Footer/footer.module.css';

const FooterDefault = ({ className = "" }) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <footer className={classNames(styles.footerDefault, className)}>
      <section className={styles.footer}>
        <div className={styles.footerContent}></div>
        <div className={styles.navigationLinks}>
          {/* Logo e Direitos Autorais */}
          <div className={styles.logoContainer}>
            <a href="/"><img className={styles.companyLogoIcon} alt="RetroReads" src="/assets/img/companylogo@2x.png" /></a>
            <div>
              <p className={styles.companyName}>RetroReads</p>
              <p className={styles.copyright}>© 2024 retroreads.com.br</p>
            </div>
          </div>

          {/* Informações */}
          <div className={classNames(styles.infos, { [styles.open]: isInfoOpen })} onClick={() => setIsInfoOpen(!isInfoOpen)}>
            <h3 className={styles.mobileOnly}>
              Informações <span className={styles.arrow}>{isInfoOpen ? '▲' : '▼'}</span>
            </h3>
            <ul className={isInfoOpen ? styles.show : styles.hide}>
              <li><a href='#' className={styles.link}>Sobre nós</a></li>
              <li><a href='#' className={styles.link}>Direitos autorais</a></li>
              <li><a href='#' className={styles.link}>Para empresas</a></li>
              <li><a href='#' className={styles.link}>Políticas</a></li>
            </ul>
          </div>

          {/* Ajuda */}
          <div className={classNames(styles.infos, { [styles.open]: isHelpOpen })} onClick={() => setIsHelpOpen(!isHelpOpen)}>
            <h3 className={styles.mobileOnly}>
              Ajuda <span className={styles.arrow}>{isHelpOpen ? '▲' : '▼'}</span>
            </h3>
            <ul className={isHelpOpen ? styles.show : styles.hide}>
              <li><a href='#' className={styles.link}>Central de ajuda</a></li>
              <li><a href='#' className={styles.link}>Troca e devolução</a></li>
              <li><a href='#' className={styles.link}>Segurança e Privacidade</a></li>
              <li><a href='#' className={styles.link}>Termos de uso</a></li>
              <li><a href='#' className={styles.link}>Acessibilidade</a></li>
              <li><a href='#' className={styles.link}>Fale conosco</a></li>
            </ul>
          </div>

          {/* Navegação */}
          <div className={classNames(styles.infos, { [styles.open]: isNavOpen })} onClick={() => setIsNavOpen(!isNavOpen)}>
            <h3 className={styles.mobileOnly}>
              Navegação <span className={styles.arrow}>{isNavOpen ? '▲' : '▼'}</span>
            </h3>
            <ul className={isNavOpen ? styles.show : styles.hide}>
              <li><a href='/' className={styles.link}>Catálogo</a></li>
              <li><a href='/my-interests' className={styles.link}>Interesses</a></li>
              <li><a href='/my-shelf' className={styles.link}>Estante</a></li>
              <li><a href='/my-sales' className={styles.link}>Anúncios</a></li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
};

FooterDefault.propTypes = {
  className: PropTypes.string,
};

export default FooterDefault;
