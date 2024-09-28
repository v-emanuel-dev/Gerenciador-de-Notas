// server.js

// Importando o app e configurando a porta
const app = require('./app');
const PORT = process.env.PORT || 3000;

// Iniciando o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
