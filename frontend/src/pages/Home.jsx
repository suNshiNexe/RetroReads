import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Home/catalog.css';
import '../css/global.css';
import Filter from '../components/Filter.jsx';

function Catalog() {
  const [books, setBooks] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [setFilters] = useState({});

  const currentPath = window.location.pathname;
  const showFilter = ['/', 'MyInterests', 'MyShelf', 'MySales'].some(page => currentPath.includes(page));

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

// Função para buscar livros da sua API
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/livros/catalog');  //
      setBooks(response.data);  //
    } catch (error) {
      console.error('Erro ao buscar os livros:', error);
    }
  };
  
  useEffect(() => {
    fetchBooks();  // Chama a função para buscar os livros quando o componente for montado
  }, []);


  return (
    <div className='container' id='container'>
      <h1 className='h1-CatalogTitle'>Catálogo</h1>

      <div className='catalog-filter'>
        {/* Placeholder que simula o espaço do botão expandido */}
        <div className={`placeholder ${isExpanded ? 'expanded' : ''}`} />

        {/* Botão de filtro */}
        <div
          className={`btn-filter ${isExpanded ? 'expanded' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img src="/assets/icons/filter-icon.svg" alt="Filtro" className='filter-icon' />

          {/* Renderize o filtro somente se showFilter for verdadeiro */}
          {isExpanded && showFilter && (
            <div className='filter-container'>
              <Filter onFilterChange={handleFilterChange} />
            </div>
          )}
        </div>
      </div>

      <div className='background-container-catalog'>
        <div className='container-bookcard'>
          {books.map((book, index) => (
            <div key={index} className="book-card">
              <img src={`http://localhost:8081${book.LVRO_IMG}`} alt={book.LVRO_TITULO} className='book_img' />
              <div className="book-details">
                <h3 className="book_title">{book.LVRO_TITULO}</h3>
                <p className="book_author">{book.LVRO_ATR}</p>
                <p className="book_price">
                  <span className='currency'>R$</span>{book.LVRO_PRCO}
                </p>
                <button className="interest-button">Tenho interesse!</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
