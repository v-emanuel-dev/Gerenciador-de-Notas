// app.js

// Importando os módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicializando a aplicação Express
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Importando e usando as rotas de posts
const postsRoutes = require('./routes/postsRoutes');
app.use('/posts', postsRoutes);

// Exportando a instância do app para ser usada no server.js
module.exports = app;
