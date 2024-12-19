import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../css/Filter/filter.module.css'; // Crie um arquivo CSS para o filtro
import '../css/global.css'

const FilterComponent = ({ className = '', onFilterChange }) => {
  // Estados para armazenar as seleções dos filtros
  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState([]);
  const [pages, setPages] = useState([]);

  // Dados dos filtros (podem ser movidos para um arquivo separado se forem usados em outras partes)
  const genreOptions = ['Aventura', 'Ficção', 'Literatura', 'Gastronomia', 'Autoajuda'];
  const yearOptions = ['< 1925', '1925 - 1950', '1950 - 1975', '1975 - 2000', '> 2000'];
  const pageOptions = ['< 50', '50 - 120', '120 - 300', '300 - 550', '> 550'];

  // Função para lidar com as mudanças nos filtros
  const handleFilterChange = (filterType, value) => {
    let updatedFilters;
    switch (filterType) {
      case 'genre':
        updatedFilters = genre.includes(value)
          ? genre.filter((item) => item !== value)
          : [...genre, value];
        setGenre(updatedFilters);
        break;
      case 'year':
        updatedFilters = year.includes(value)
          ? year.filter((item) => item !== value)
          : [...year, value];
        setYear(updatedFilters);
        break;
      case 'pages':
        updatedFilters = pages.includes(value)
          ? pages.filter((item) => item !== value)
          : [...pages, value];
        setPages(updatedFilters);
        break;
      default:
        break;
    }
    onFilterChange({ genre, year, pages });
  };

  return (
    <div className={classNames(styles.filterContainer, className)}>
      <h2 className={styles.filterTitle}>Filtros</h2>
      <div className={styles.filterGroup}>
        
        {/* Filtro por Gênero */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterLabel}>Gênero</h3>
          {genreOptions.map((option) => (
            <label key={option} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={genre.includes(option)}
                onChange={() => handleFilterChange('genre', option)}
              />
              {option}
            </label>
          ))}
          <a href="#mais-opcoes" className={styles.moreOptions}>Mais opções ↓</a>
        </div>

        {/* Filtro por Ano de Lançamento */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterLabel}>Ano de lançamento</h3>
          {yearOptions.map((option) => (
            <label key={option} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={year.includes(option)}
                onChange={() => handleFilterChange('year', option)}
              />
              {option}
            </label>
          ))}
          <a href="#mais-opcoes" className={styles.moreOptions}>Mais opções ↓</a>
        </div>

        {/* Filtro por Quantidade de Páginas */}
        <div className={styles.filterSection}>
          <h3 className={styles.filterLabel}>Quantidade de páginas</h3>
          {pageOptions.map((option) => (
            <label key={option} className={styles.filterOption}>
              <input
                type="checkbox"
                checked={pages.includes(option)}
                onChange={() => handleFilterChange('pages', option)}
              />
              {option}
            </label>
          ))}
          <a href="#mais-opcoes" className={styles.moreOptions}>Mais opções ↓</a>
        </div>
      </div>
    </div>
  );
};

FilterComponent.propTypes = {
  className: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterComponent;
