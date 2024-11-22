import React, { useState, useEffect } from "react";
import axios from 'axios';
import { genres } from '../pages/BookRegister';
import '../css/BookEdit/bookEdit.css'


const EditBook = ({ book, isOpen, onClose, onSave, onDelete, viewOnly }) => {
  const [bookDetails, setBookDetails] = useState({
    titulo: "",
    autor: "",
    editora: "",
    data_lancamento: "",
    genero: "",
    quantidade_paginas: "",
    isbn: "",
    descricao: "",
    status_leitura: "",
    nota: "",
    preco: "",
    quantidade: ""
  });

  const [selectedGenres, setSelectedGenres] = useState(bookDetails.genero ? bookDetails.genero.split(",") : []);

  useEffect(() => {
    if (book) {
      setBookDetails({
        titulo: book.LVRO_TITULO,
        autor: book.LVRO_ATR,
        editora: book.LVRO_EDIT,
        data_lancamento: book.LVRO_DT_LANC,
        genero: book.LVRO_GEN,
        quantidade_paginas: book.LVRO_QNT_PG,
        isbn: book.LVRO_ISBN,
        descricao: book.LVRO_DESC,
        status_leitura: book.LVRO_STT_LT,
        nota: book.LVRO_AV,
        preco: book.LVRO_PRCO,
        quantidade: book.LVRO_QNT
      });
      setSelectedGenres(book.LVRO_GEN ? book.LVRO_GEN.split(",") : []);
    }
  }, [book]);

  const handleGenreChange = (event) => {
    if (viewOnly) return; // Não permite edição em modo viewOnly
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedGenres(selected);
    setBookDetails(prev => ({ ...prev, genero: selected.join(",") }));
  };


  const handleChange = (e) => {
    if (viewOnly) return; // Não permite edição em modo viewOnly
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:8081/livros/update/${book.LVRO_ID}`, bookDetails, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        onSave({ ...bookDetails});  // Atualiza os livros com as informações editadas
        onClose();  // Fecha o modal
      })
      .catch(err => console.log("Erro ao atualizar livro:", err));
  };


  const handleDelete = () => {
    if (book) {
      onDelete(book.LVRO_ID);
      onClose();
    }
  }

  // const handleDelete = (bookId) => {

  //   if (!book || !book.LVRO_ID) {
  //     console.error("Livro não encontrado ou ID do livro indefinido.");
  //     return;
  //   }
  //   axios.delete(`http://localhost:8081/livros/delete/${book.LVRO_ID}`, {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem("token")}`,
  //     },
  //   })
  //     .then((res) => {
  //       console.log("Livro deletado com sucesso:", res.data);

  //        // Atualiza o estado removendo o livro deletado
  //       setBooks((prevBooks) => prevBooks.filter(book => book.LVRO_ID !== bookId));

  //     })
  //     .catch(err => console.error("Erro ao deletar o livro:", err));
  // };

  return (
    //isOpen && (
    isOpen && book && book.LVRO_ID && (
      <div className="modal">
        <div className="modal-content">

        {viewOnly && (
          <h1 className="h1-viewTitle">{bookDetails.titulo}</h1>  
        )}

        {!viewOnly && (
          <div className="modal-btn-deleteAndTitle"> 
            <h1 className="h1-viewTitle">{bookDetails.titulo}</h1>
            <button className="deleteBtn" onClick={handleDelete}>
              <img src="./assets/icons/trash-icon.svg" alt="deletar" className="trash-icon" />
            </button>
          </div>
        )}

          <div className="container-div">

            {/* DIV FOTO DO LIVRO ↓ */}
            <div className="bookPhoto">
              <h1 className="h1-subTitle">Foto do livro</h1>

              {/* Campo de anexo da imagem ↓ */}

              <div className="form-field" id="image-upload-container">
                <label htmlFor="file-input" className="upload-label">
                 <img src={`http://localhost:8081${book.LVRO_IMG}`} alt="userBookImage" className="book_imgs" />
                </label>
              </div>
            </div>

            {/* DIV DADOS DO LIVRO ↓ */}
            <div className="bookEditData">
              <h1 className="h1-subTitle">Dados do livro</h1>

              <div className="form-field">
                {/* Campo TÍTULO ↓ */}
                <label htmlFor="titulo">Título</label>
                <input type="text" name="titulo" className="bookEdit_title" value={bookDetails.titulo} onChange={handleChange} disabled={viewOnly} />

                {/* Campo AUTOR ↓ */}
                <label htmlFor="autor">Autor</label>
                <input type="text" name="autor" className="bookEdit_author" value={bookDetails.autor} onChange={handleChange}  disabled={viewOnly}/>

                {/* Campo EDITORA ↓ */}
                <label htmlFor="editora">Editora</label>
                <input type="text" name="editora" className="bookEdit_publisher" value={bookDetails.editora} onChange={handleChange} disabled={viewOnly}/>

                {/* Campo DATA DE LANÇAMENTO ↓ */}
                <label htmlFor="data_lancamento">Data de lançamento</label>
                <input type="date" format="yyyy-MM-dd" name="data_lancamento" className="bookEdit_date" value={bookDetails.data_lancamento} onChange={handleChange} disabled={viewOnly}/>

                {/* Campo GÊNERO ↓ */}
                <label htmlFor="genero">Gênero</label>
                <select name="genero" id="genero" className="bookEdit_genre" value={selectedGenres} onChange={handleGenreChange} disabled={viewOnly} >
                  {genres.map((genre, index) => (<option key={index} value={genre}>{genre}</option>))}
                </select>

                {/* Campo QNT DE PÁGINAS ↓ */}
                <label htmlFor="quantidade_paginas">Quantidade de páginas</label>
                <input type="text" name="quantidade_paginas" className="bookEdit_pages" value={bookDetails.quantidade_paginas} onChange={handleChange} disabled={viewOnly}/>

                {/* Campo ISBN ↓ */}
                <label htmlFor="isbn">ISBN</label>
                <input type="text" name="isbn" className="bookEdit_ISBN" value={bookDetails.isbn} onChange={handleChange} disabled={viewOnly}/>
              </div>
            </div>

            {/* DIV DETALHES DO LIVRO ↓ */}
            <div className="bookEditDetail">
              <h1 className="h1-subTitle">Detalhes</h1>

              {/* Campo DESCRIÇÃO ↓ */}
              <div className="form-field">
                <label htmlFor="descricao">Descrição</label>
                <textarea name="descricao" className="bookEdit_description" value={bookDetails.descricao} onChange={handleChange} disabled={viewOnly}/>

                <div className="small-fields">
                  {/* Campo NOTA ↓ */}
                  <div className="form-field">
                    <label htmlFor="nota">Nota</label>
                    <input type="number" name="nota" className="bookEdit_score" min={1} max={5} value={bookDetails.nota} onChange={handleChange} disabled={viewOnly}/>
                  </div>

                  {/* Campo PREÇO ↓ */}
                  <div className="form-field">
                    <label htmlFor="preco">Preço</label>
                    <input type="text" name="preco" className="bookEdit_price" value={bookDetails.preco} onChange={handleChange} disabled={viewOnly}/>
                  </div>

                  {/* Campo QUANTIDADE ↓ */}
                  <div className="form-field">
                    <label htmlFor="quantidade">Quantidade</label>
                    <input type="text" name="quantidadeT" className="bookEdit_amount" value={bookDetails.quantidade} onChange={handleChange} disabled={viewOnly}/>
                  </div>

                  {/* Campo STATUS DA LEITURA ↓ */}
                  <div className="form-field">
                    <h1 className="h1-subTitle">Status da leitura</h1>

                    <div className="reading-status">
                      <label className="custom-radio left">
                        <input type="radio" name="status_leitura" value="wantToRead" checked={bookDetails.status_leitura === "wantToRead"} onChange={handleChange} disabled={viewOnly}/>
                        <span className="radiomark"></span>
                        Quero ler
                      </label>

                      <label className="custom-radio right">
                        <input type="radio" name="status_leitura" value="reading" checked={bookDetails.status_leitura === "reading"} onChange={handleChange} disabled={viewOnly}/>
                        <span className="radiomark"></span>
                        Estou lendo
                      </label>

                      <label className="custom-radio left">
                        <input type="radio" name="status_leitura" value="read" checked={bookDetails.status_leitura === "read"} onChange={handleChange} disabled={viewOnly}/>
                        <span className="radiomark"></span>
                        Já li
                      </label>

                      <label className="custom-radio right">
                        <input type="radio" name="status_leitura" value="getRideOf" checked={bookDetails.status_leitura === "getRideOf"} onChange={handleChange} disabled={viewOnly}/>
                        <span className="radiomark"></span>
                        Quero me livrar
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-btn">
            <button onClick={onClose} className="closeBtn" > Fechar </button>
          {!viewOnly && (
            <button onClick={handleSave} className="saveBtn"> Salvar alterações </button>
          )}
          </div>
        </div>
      </div>
    )
  );
};


export default EditBook;
