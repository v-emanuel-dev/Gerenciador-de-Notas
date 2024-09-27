// Importando módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

// Inicializando o aplicativo Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configurando a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_db'
});

// Conectando ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro na conexão com o banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Rota para obter todos os itens
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Rota para adicionar um novo item
app.post('/items', (req, res) => {
    const newItem = req.body;
    db.query('INSERT INTO items SET ?', newItem, (err) => {
        if (err) throw err;
        res.status(201).send('Item adicionado com sucesso');
    });
});

// Rota para atualizar um item
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    db.query('UPDATE items SET ? WHERE id = ?', [updatedItem, id], (err) => {
        if (err) throw err;
        res.send('Item atualizado com sucesso');
    });
});

// Rota para excluir um item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', id, (err) => {
        if (err) throw err;
        res.send('Item excluído com sucesso');
    });
});

// Iniciando o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
