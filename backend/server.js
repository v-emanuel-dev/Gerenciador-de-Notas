// server.js

// Importing the app and setting the port
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Starting the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
