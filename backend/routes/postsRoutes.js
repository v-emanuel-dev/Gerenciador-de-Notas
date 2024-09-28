// routes/postsRoutes.js

// Importando o módulo express e o controller de posts
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

// Definindo as rotas e associando com as funções do controller
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

// Exportando o router para ser usado no app principal
module.exports = router;
