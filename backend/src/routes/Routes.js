// routes/Routes.js
const express = require('express');
const bookRoutes = require('./bookController'); // Importa as rotas do módulo de livros
const userRoutes = require('./userController'); // Importa as rotas do módulo de usuários

const router = express.Router();

// Rotas para livros
router.use('/livros', bookRoutes);
// Rotas para usuários
router.use('/', userRoutes);

module.exports = router;
