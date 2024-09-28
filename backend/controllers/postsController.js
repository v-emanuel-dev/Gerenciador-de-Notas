// controllers/postsController.js

// Importing the database connection
const db = require('../config/db');

// Function to list all posts
exports.getAllPosts = (req, res) => {
  db.query('SELECT * FROM posts', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Function to get a specific post by ID
exports.getPostById = (req, res) => {
  db.query('SELECT * FROM posts WHERE id = ?', [req.params.id], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(results[0]);
  });
};

// Function to create a new post
exports.createPost = (req, res) => {
  const { title, content } = req.body;
  db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, title, content });
  });
};

// Function to update an existing post
exports.updatePost = (req, res) => {
  const { title, content } = req.body;
  db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};

// Function to delete a post by ID
exports.deletePost = (req, res) => {
  db.query('DELETE FROM posts WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).send();
  });
};
