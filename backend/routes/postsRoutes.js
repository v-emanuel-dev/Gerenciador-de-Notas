// routes/postsRoutes.js

// Importing the express module and the posts controller
const express = require('express');
const router = express.Router(); 
const postsController = require('../controllers/postsController'); 

// Defining the routes and associating them with the controller functions
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

// Exporting the router to be used in the main app
module.exports = router;
