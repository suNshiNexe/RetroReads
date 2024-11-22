const express = require('express');
const path = require('path');
const { authenticateToken } = require('../auth/auth');
const router = express.Router();
const multer = require('multer'); // Para upload de imagens
const db = require('../db/db');
const fs = require('fs');
const cors = require("cors");



// Configuração do multer para uploads de imagem

// Configura o caminho relativo para o diretório 'uploads' (considerando a raiz do projeto)
const uploadPath = path.resolve(__dirname, '../../../uploads');  // Subindo dois níveis para acessar a raiz

// Cria o diretório 'uploads' se ele não existir
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
//Instanciando multer com config de armazenamento
const upload = multer({ storage: storage });
// Criar um novo livro (Create)
router.post('/add', authenticateToken, upload.single('image'), (req, res) => {
  debugger;
  console.log('req.body:', req.body);  // Verifique os dados
  console.log('req.file:', req.file);  // Verifique o arquivo de imagem

  const {
    book_title,
    book_author,
    book_publisher,
    book_gender,
    book_numberPages,
    book_isbn,
    book_description,
    book_score,
    book_price,
    book_amount,
    reading_Status,
    book_releaseDate } = req.body;

  const imagem = `/uploads/${req.file.filename}`;
  const userId = req.user.id; // Pega o user_id do token JWT

  const sql = `INSERT INTO tblvro (LVRO_TITULO, LVRO_ATR, LVRO_EDIT, LVRO_GEN, LVRO_QNT_PG, LVRO_ISBN, LVRO_DESC, LVRO_AV, LVRO_PRCO,
               LVRO_QNT, LVRO_STT_LT, LVRO_DT_LANC, LVRO_IMG, LVRO_DN)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [book_title, book_author, book_publisher, book_gender, book_numberPages, book_isbn, book_description, book_score, book_price,
    book_amount, reading_Status, book_releaseDate, imagem, userId], (err, result) => {
      if (err) {
        console.error("Erro ao inserir livro no banco:", err);
        return res.status(500).json({ error: err });
      }
      res.status(200).json({ message: 'Livro adicionado com sucesso!' });
    });
});

// Listar todos os 'livros' do usuário (Read)
router.get('/my-books', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const sql = `SELECT * FROM tblvro WHERE LVRO_DN = ?`;

  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

// Atualizar um livro (Update)
router.put('/update/:id', authenticateToken, upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { titulo, autor, editora, genero, quantidade_paginas, isbn, descricao, nota, preco, quantidade, status_leitura, data_lancamento } = req.body;
  const imagem = req.file ? req.file.path : null;
  const userId = req.user.id;
  console.log("Dados recebidos no body:", req.body); //REMOVER (DEBUG)
  console.log("Imagem recebida:", req.file); //REMOVER (DEBUG)

  const sql = `UPDATE tblvro SET LVRO_TITULO = ?, LVRO_ATR = ?, LVRO_EDIT = ?, LVRO_GEN = ?, 
               LVRO_QNT_PG = ?, LVRO_ISBN = ?, LVRO_DESC = ?, LVRO_AV = ?, LVRO_PRCO = ?, LVRO_QNT = ?, 
               LVRO_STT_LT = ?, LVRO_DT_LANC = ?${imagem ? 'LVRO_IMG = ?,' : ''} WHERE LVRO_ID = ? AND LVRO_DN = ?`;

  const params = [titulo, autor, editora, genero, quantidade_paginas, isbn, descricao, nota, preco, quantidade, status_leitura, data_lancamento];
  if (imagem) params.push(imagem);
  params.push(id, userId);

  db.query(sql, params, (err, result) => {
    console.error("Erro ao registrar livro:", err);
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Livro atualizado com sucesso!' });
  });
});

// Excluir um livro (Delete)
router.delete('/delete/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const sql = `DELETE FROM tblvro WHERE LVRO_ID = ? AND LVRO_DN = ?`;

  db.query(sql, [id, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: 'Livro excluído com sucesso!' });
  });
});

//catalogo mostrar livros
// Rota para pegar os livros com status 'getRideOf'
router.get('/catalog', async (req, res) => {
  try {
    const query = `
      SELECT tblvro.*, tbuser.USER_NM, tbuser.USER_EMAIL, tbuser.USER_ID
      FROM tblvro
      JOIN tbuser ON tblvro.LVRO_DN = tbuser.USER_ID
      WHERE tblvro.LVRO_STT_LT = 'getRideOf';
    `;
    const [rows] = await db.promise().query(query);
    // Log para verificar o conteúdo de `rows` e `fields`
    console.log('Resposta do banco de dados:', { rows });  // Log de depuração


    // Verificando explicitamente se rows é um array
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Nenhum livro encontrado no catálogo.' });
    }

    // Retorna os dados no formato correto
    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar os livros do catálogo:', error); // Log para depuração (REMOVER, DEBUG)
    res.status(500).json({ message: 'Erro ao buscar os livros do catálogo', error });
  }
});

//ROTA para buscar detalhes do livro por ID
router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM tblvro WHERE LVRO_ID = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result[0]); // Envia os dados do livro específico
  });
});

module.exports = router;
