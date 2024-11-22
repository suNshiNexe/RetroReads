// server.js
const express = require("express");
const cors = require("cors");
const routes = require("../routes/Routes");
const livrosRoutes = require('../routes/bookController');
const path = require('path');
const app = express();


app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));


// Usar as rotas
app.use('/', routes);
app.use('/', livrosRoutes);
// app.use('/livros', livrosRoutes);




app.listen(8081, () => {
    console.log("Conexão com Servidor aberta.");
});
