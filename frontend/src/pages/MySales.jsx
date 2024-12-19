import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/MySales/sales.css";

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

const MySales = () => {
  const [booksForSale, setBooksForSale] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar livros com status 'getRideOf' (livros à venda)
  const fetchBooks = async () => {
    try {
      // Requisição ao backend para obter livros com status 'getRideOf'
      const response = await axios.get("http://localhost:8081/my-sales", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`, // Autorização com o token
        },
      });

      // Atualiza o estado com os livros retornados
      setBooksForSale(response.data);
      setLoading(false); // Finaliza o carregamento
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      setLoading(false); // Finaliza o carregamento em caso de erro
    }
  };

  // UseEffect para fazer a requisição na primeira renderização
  useEffect(() => {
    fetchBooks(); // Chama a função de fetch quando o componente monta
  }, []); // A requisição é feita apenas uma vez

  return (
    <div className="container" id="container">
      <h1 className="h1-ShelfTitle">Minhas Vendas</h1>

      <div className="background-container-shelf">
        <div className="container-bookcard">
          {loading
            ? Array(12).fill(0).map((_, index) => <SkeletonCard key={index} />)
            : booksForSale.map((book, index) => (
              <div className="book-card-shelf" key={index}>
                <img
                  src={`http://localhost:8081${book.LVRO_IMG}`}
                  alt="Imagem do Livro"
                  className="book_img"
                />
                <div className="book-details-shelf">
                  <h3 className="book_title">{book.LVRO_TITULO}</h3>
                  <p className="book_author">
                    {book.LVRO_ATR.includes(',')
                      ? 'Vários autores'
                      : book.LVRO_ATR}
                  </p>
                  <p className="book_score">
                    <span className="book_review">
                      <img
                        src="/assets/icons/star-icon.svg"
                        alt="review"
                        className="star-icon"
                      />
                    </span>
                    {book.LVRO_AV}/5
                  </p>
                  <div className={`reading-status-view ${book.LVRO_STT_LT}`}>
                    {book.LVRO_STT_LT === "getRideOf" && "À venda"}
                  </div>

                  {/* Exibindo o estoque do livro */}
                  <p className="book_stock">
                    Estoque: {book.LVRO_QNT} un
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MySales;