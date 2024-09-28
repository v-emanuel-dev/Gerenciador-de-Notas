// routes/postsRoutes.js

// Importing the express module and the posts controller
const express = require('express');
const router = express.Router(); // Creating a new router object
const postsController = require('../controllers/postsController'); // Importing the posts controller

// Defining the routes and associating them with the controller functions
router.get('/', postsController.getAllPosts); // Route to get all posts
router.get('/:id', postsController.getPostById); // Route to get a specific post by ID
router.post('/', postsController.createPost); // Route to create a new post
router.put('/:id', postsController.updatePost); // Route to update an existing post by ID
router.delete('/:id', postsController.deletePost); // Route to delete a post by ID

// Exporting the router to be used in the main app
module.exports = router;
