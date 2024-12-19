import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Home/catalog.css';
import InterestErrorAlert from '../components/InterestErrorAlert.jsx';
import InterestAlert from '../components/InterestAlert.jsx';
import Filter from '../components/Filter.jsx';


//Esqueleto para loading dos livros
const SkeletonCard = () => (
  <div className="book-card">
    <div className="skeleton image"></div>
    <div className="book-details">
      <div className="skeleton text"></div>
      <div className="skeleton text" style={{ width: "50%" }}></div>
      <div className="skeleton text" style={{ width: "30%" }}></div>
    </div>
  </div>
);

function Catalog() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);  // Modal de erro

  const [books, setBooks] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [setFilters] = useState({});

  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const booksPerPage = 18; // Quantidade de livros por página
  const totalPages = Math.ceil(books.length / booksPerPage); // Total de páginas

  const currentPath = window.location.pathname;
  const showFilter = ['/', 'MyInterests', 'MyShelf', 'MySales'].some(page => currentPath.includes(page));

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const handleHaveInterest = async (userId, livroId) => {
    try {
      const response = await axios.post('http://localhost:8081/interest', {
        comprador_id: userId,  // ID do usuário comprador (do localStorage, por exemplo)
        livro_id: livroId      // ID do livro
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,  // Adiciona o token no cabeçalho
        }
      });

      setIsModalOpen(true); // Mostrar o retorno, pode ser sucesso ou erro
    } catch (error) {
      setIsErrorModalOpen(true);
    }
  };

  // Função para buscar livros da sua API
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8081/livros/catalog');  //
      setBooks(response.data);  //
    } catch (error) {
      console.error('Erro ao buscar os livros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();  // Chama a função para buscar os livros quando o componente for montado
  }, []);

  // Calcular o índice dos livros na página atual
  const startIndex = (currentPage - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = books.slice(startIndex, endIndex); // Livros da página atual

  // Função para mudar de página
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => {
      if (direction === "next" && endIndex < books.length) {
        return prevPage + 1;
      } else if (direction === "prev" && startIndex > 0) {
        return prevPage - 1;
      }
      return prevPage;
    });
  };

  return (
    <div className='container'>
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
          {loading
            ? Array(12)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />) // Exibe placeholders
            : currentBooks.map((book, index) => (
              <div key={index} className="book-card" onClick={() => window.location.href = `/books/${book.LVRO_ID}`}>
                <img src={`http://localhost:8081${book.LVRO_IMG}`} alt={book.LVRO_TITULO} loading="lazy" className='book_img' />
                <div className="book-details">
                  <h3 className="book_title">{book.LVRO_TITULO}</h3>
                  <p className="book_author">
                    {
                      book.LVRO_ATR.includes(',') // Verifica se há mais de um autor (separados por vírgulas)
                        ? 'Vários autores'
                        : book.LVRO_ATR
                    }
                  </p>
                  <p className="book_price">
                    <span className='currency'>R$</span>{book.LVRO_PRCO.toFixed(2)}
                  </p>
                  <button className="interest-button" onClick={(event) => {
                    event.stopPropagation();
                    handleHaveInterest(localStorage.getItem('user_id'), book.LVRO_ID)
                  }}>Tenho interesse!</button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
        >
          <img src="./assets/icons/arrow-left-icon.svg" alt="Anterior" className="arrowIconLeft" />
        </button>

        {/* Exibir página atual e total de páginas */}
        <span className="page">Pág. {currentPage} de <span className="totalPages">{totalPages}</span></span>

        <button
          className="pagination-btn"
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
        >
          <img src="./assets/icons/arrow-right-icon.svg" alt="Próxima" className="arrowIconRight" />
        </button>
      </div>

      {/* Aqui está o modal de interesse */}
      <InterestAlert
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <InterestErrorAlert
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
}

export default Catalog;
