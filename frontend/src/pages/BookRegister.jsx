import Validation from '../Validations/bookRegisterValidation.js';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Book Register/bookRegister.css';

export const genres = [ //Gênero dos livros
  "Antologia", "Arqueologia", "Arte", "Aventura", "Autoajuda",
  "Biografia", "Ciências", "Clássico", "Conto", "Crônicas",
  "Cultura Nerd", "Cultura Pop", "Cyberpunk", "Distopia", "Drama",
  "Educação", "Ecologia", "Economia", "Ensaios", "Erótico",
  "Esportes", "Espiritualidade", "Fábula", "Fantasia", "Ficção Científica",
  "Ficção Policial", "Filosofia", "Gastronomia", "Guerra", "História em Quadrinhos",
  "Histórico", "Humor", "Infantil", "Jovem Adulto", "LGBTQIA+",
  "Mangá", "Matemática", "Medicina", "Mistério", "Mitologia",
  "Música", "Natureza", "Negócios", "Paranormal", "Poesia",
  "Política", "Psicologia", "Realismo Mágico", "Religião", "Romance",
  "Saúde e Bem-Estar", "Slice of Life", "Sociologia", "Steampunk", "Suspense",
  "Sustentabilidade", "Tecnologia", "Terror", "Thriller", "Urban Fantasy",
  "Utopia", "Viagem", "Western"
];

function BookRegister() {

  // Estado para armazenar os gêneros selecionados
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [values, setValues] = useState({
    book_img: '',
    book_title: '',
    book_author: '',
    book_publisher: '',
    book_releaseDate: '',
    book_gender: '',
    book_numberPages: '',
    book_isbn: '',
    book_description: '',
    book_score: '',
    book_price: '',
    book_amount: '',
    reading_Status: ''
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = 'http://localhost:8081/login';
    }
  }, [])

  const handleInput = (event) => {
    const { name, value } = event.target;
    // Atualiza o valor do campo específico em 'values'
    setValues(prev => ({ ...prev, [name]: value }));
    // Validação apenas do campo atual
    const fieldError = Validation({ ...values, [name]: value })[name];
    // Atualiza o erro somente do campo em que o usuário está escrevendo
    setErrors(prevErrors => ({ ...prevErrors, [name]: fieldError }));
  };

  // Função para atualizar os gêneros selecionados
  const handleGenreChange = (event) => {
    const { options } = event.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedGenres(selected);
    setValues(prev => ({ ...prev, book_gender: selected.join(',') }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    console.log(values);  //retirar linha depois (RETIRAR)

    if (Object.keys(validationErrors).length === 0) {

      const formData = new FormData();
      // Adiciona os campos do livro no FormData
      formData.append('book_title', values.book_title);
      formData.append('book_author', values.book_author);
      formData.append('book_publisher', values.book_publisher);
      formData.append('book_releaseDate', values.book_releaseDate);
      formData.append('book_gender', selectedGenres.join(','));  // Gêneros são uma lista
      formData.append('book_numberPages', values.book_numberPages);
      formData.append('book_isbn', values.book_isbn);
      formData.append('book_description', values.book_description);
      formData.append('book_score', values.book_score);
      formData.append('book_price', values.book_price);
      formData.append('book_amount', values.book_amount);
      formData.append('reading_Status', values.reading_Status);
      // IMAGEM
      if (values.book_img) {
        formData.append('image', values.book_img);
      }

      try {
        const res = await axios.post('http://localhost:8081/livros/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        console.log('Livro adicionado com sucesso', res.data);
        navigate('/my-shelf');
      } catch (err) {
        console.error("Erro ao adicionar livro:", err.response ? err.response.data : err.message);
        alert("Erro ao adicionar livro. Verifique o console para mais detalhes.");
      }
    }
  };

  /* Função para as capas imagens*/
  const [imagePreview, setImagePreview] = useState(null); // useState para armazenar a imagem carregada

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result); // Atualiza o estado com o caminho da imagem
      };
      reader.readAsDataURL(file);
      // Armazena o arquivo no estado 'values'
      setValues(prev => ({
        ...prev,
        book_img: file // Armazena o próprio arquivo e não o caminho da imagem
      }));
    } else {
      setImagePreview(null); // Limpa a pré-visualização
      setValues(prev => ({
        ...prev,
        book_img: "" // Limpa o valor do arquivo no estado
      }));
    }
  };

  return (
    <div className="container" id="container">
      <h1 className="h1-Title-book-register">Adicionar novo livro</h1>
      <div className="form-container-bookRegister">
        <form onSubmit={handleSubmit}>
          <div className="container-div">
            {/* DIV FOTO DO LIVRO ↓ */}
            <div className="bookPhoto">
              <h1 className="h1-subTitle">Foto do livro</h1>

              {/* Campo de anexo da imagem ↓ */}

              <div className="form-field" id="image-upload-container">
                <label htmlFor="file-input" className="upload-label">
                  <input type="file" id="file-input" accept="image/*" className="file-input" name="book_img" onChange={handleFileChange} />
                  <span className="picture_image">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Pré-visualização" />
                    ) : (
                      <img src="/assets/img/add.png" alt="Adicionar imagem" id="addIcon" />
                    )}
                  </span>
                </label>
              </div>
              {errors.book_img && <span className='text-danger'>{errors.book_img}</span>}
            </div>

            {/* DIV DADOS DO LIVRO ↓ */}
            <div className="bookData">
              <h1 className="h1-subTitle">Dados do livro</h1>

              {/* Campo TÍTULO ↓ */}

              <div className="form-field">
                <label htmlFor="book_title">Título:</label>
                <input type="text" id="book_title" name="book_title" onChange={handleInput} />
                {errors.book_title && <span className='text-danger'>{errors.book_title}</span>}

                {/* Campo AUTOR ↓ */}

                <label htmlFor="book_author">Autor:</label>
                <input type="text" id="book_author" name="book_author" onChange={handleInput} />
                {errors.book_author && <span className='text-danger'>{errors.book_author}</span>}

                {/* Campo EDITORA ↓ */}

                <label htmlFor="book_publisher">Editora:</label>
                <input type="text" id="book_publisher" name="book_publisher" onChange={handleInput} />
                {errors.book_publisher && <span className='text-danger'>{errors.book_publisher}</span>}

                {/* Campo DATA DE LANÇAMENTO ↓ */}

                <label htmlFor="book_releaseDate">Data de lançamento:</label>
                <input type="date" id="book_releaseDate" name="book_releaseDate" onChange={handleInput} />
                {errors.book_releaseDate && <span className='text-danger'>{errors.book_releaseDate}</span>}

                {/* Campo GÊNERO ↓ */}

                <label htmlFor="book_gender">Gênero:</label>
                <select name="book_gender" id="book_gender" value={selectedGenres} onChange={handleGenreChange}>
                  <option value="">Selecione</option>
                  {genres.map((genre, index) => (<option key={index} value={genre}>{genre}</option>))}
                </select>
                {errors.book_gender && <span className='text-danger'>{errors.book_gender}</span>}

                {/* Campo QNT DE PÁGINAS ↓ */}

                <label htmlFor="book_numberPages">Quantidade de páginas:</label>
                <input type="text" id="book_numberPages" name="book_numberPages" onChange={handleInput} />
                {errors.book_numberPages && <span className='text-danger'>{errors.book_numberPages}</span>}

                {/* Campo ISBN ↓ */}

                <label htmlFor="book_isbn">ISBN:</label>
                <input type="text" id="book_isbn" name="book_isbn" onChange={handleInput} />
                {errors.book_isbn && <span className='text-danger'>{errors.book_isbn}</span>}
              </div>
            </div>

            {/* DIV DETALHES DO LIVRO ↓ */}
            <div className="bookDetail">
              <h1 className="h1-subTitle">Detalhes</h1>

              {/* Campo DESCRIÇÃO ↓ */}

              <div className="form-field">
                <label htmlFor="book_description">Descrição:</label>
                <textarea id="book_description" name="book_description" onChange={handleInput}></textarea>
                {errors.book_description && <span className='text-danger'>{errors.book_description}</span>}
              </div>

              {/* Campo NOTA ↓ */}
              <div className="small-fields">

                <div className="form-field">
                  <label htmlFor="book_score">Nota:</label>
                  <input type="number" id="book_score" name="book_score" min={1} max={5} onChange={handleInput} />
                  {errors.book_score && <span className='text-danger'>{errors.book_score}</span>}
                </div>

                {/* Campo PREÇO ↓ */}

                <div className="form-field">
                  <label htmlFor="book_price">Preço:</label>
                  <input type="text" id="book_price" name="book_price" onChange={handleInput} />
                  {errors.book_price && <span className='text-danger'>{errors.book_price}</span>}
                </div>

                {/* Campo QUANTIDADE ↓ */}

                <div className="form-field">
                  <label htmlFor="book_amount">Quantidade:</label>
                  <input type="text" id="book_amount" name="book_amount" onChange={handleInput} />
                  {errors.book_amount && <span className='text-danger'>{errors.book_amount}</span>}
                </div>

                {/* Campo STATUS DA LEITURA ↓ */}
                <div className="form-field">

                  <h1 className="h1-subTitle">Status da leitura</h1>

                  <div className="reading-status">

                    <label className="custom-radio left">
                      <input type="radio" name="reading_Status" value="wantToRead" onChange={handleInput} />
                      <span className="radiomark"></span>
                      Quero ler
                    </label>


                    <label className="custom-radio right">
                      <input type="radio" name="reading_Status" value="reading" onChange={handleInput} />
                      <span className="radiomark"></span>
                      Estou lendo
                    </label>

                    <label className="custom-radio left">
                      <input type="radio" name="reading_Status" value="read" onChange={handleInput} />
                      <span className="radiomark"></span>
                      Já li
                    </label>

                    <label className="custom-radio right">
                      <input type="radio" name="reading_Status" value="getRideOf" onChange={handleInput} />
                      <span className="radiomark"></span>
                      Quero me livrar
                    </label>
                  </div>
                  {errors.reading_Status && <span className='text-danger'>{errors.reading_Status}</span>}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn-successful-add" id="btn btn-sucess-add">
            Cadastrar livro
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookRegister;
