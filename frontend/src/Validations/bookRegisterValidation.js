function Validation(values) {
     let error = {}
   
     // Padrões para validação
     const isbn_pattern = /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/;// Padrão para ISBN-10 ou ISBN-13
     const score_pattern = /^[0-5]$/; // Padrão para nota de 0 a 5
     const price_pattern = /^\d+(\.\d{1,2})?$/; // Padrão para preço (com ou sem casas decimais)
     const pages_pattern = /^\d+$/; // Padrão para número de páginas (somente dígitos)
   
     // Validação da imagem do livro
     if (!values.book_img || values.book_img === "") {
          error.book_img = "A imagem do livro é obrigatória";
        }
   
     // Validação do título do livro
     if (values.book_title === "") {
       error.book_title = "O título do livro é obrigatório";
     }
   
     // Validação do autor
     if (values.book_author === "") {
       error.book_author = "O nome do autor é obrigatório";
     }
   
     // Validação da editora
     if (values.book_publisher === "") {
       error.book_publisher = "A editora é obrigatória";
     }
   
     // Validação da data de lançamento
     if (values.book_releaseDate === "") {
       error.book_releaseDate = "A data de lançamento é obrigatória";
     }
   
     // Validação do gênero
     if (!values.book_gender || values.book_gender === "") {
      error.book_gender = "Selecione um gênero";
    }
   
     // Validação do número de páginas
     if (values.book_numberPages === "") {
       error.book_numberPages = "A quantidade de páginas é obrigatória";
     } else if (!pages_pattern.test(values.book_numberPages)) {
       error.book_numberPages = "A quantidade de páginas deve ser um número válido";
     }
   
     // Validação do ISBN
     if (values.book_isbn === "") {
      error.book_isbn = "O ISBN é obrigatório";
    } else if (!isbn_pattern.test(values.book_isbn)) {
      error.book_isbn = "Digite um ISBN válido";
    }
   
     // Validação da descrição
     if (values.book_description === "") {
       error.book_description = "A descrição do livro é obrigatória";
     }
   
     // Validação da nota
     if (values.book_score === "") {
       error.book_score = "A nota do livro é obrigatória";
     } else if (!score_pattern.test(values.book_score)) {
       error.book_score = "A nota deve ser um número entre 0 e 5";
     }
   
     // Validação do preço
     if (values.book_price === "") {
       error.book_price = "O preço é obrigatório";
     } else if (!price_pattern.test(values.book_price)) {
       error.book_price = "Digite um preço válido";
     }
   
     // Validação da quantidade
     if (values.book_amount === "") {
       error.book_amount = "A quantidade é obrigatória";
     } else if (!pages_pattern.test(values.book_amount)) {
       error.book_amount = "A quantidade deve ser um número válido";
     }
   
     // Validação do status da leitura
     if (values.reading_status === "") {
       error.reading_status = "Selecione o status da leitura";
     }
   
     return error;
   }
   
   export default Validation;