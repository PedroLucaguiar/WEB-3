const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors()); // Adicione esta linha para habilitar CORS

// Configuração do CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cadastro'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida!');
});

//----------------------------------------------------- CADASTRO -----------------------------------------------------//


app.post('/api/cadastro', (req, res) => {
    const { primeiro, sobrenome, usuario, estado, cpf, cep } = req.body;

    // Verifica se algum dos campos obrigatórios está vazio
    //if (!primeironome || !sobrenome || !usuario || !estado || !cpf || !cep) {
        //res.status(400).send('Todos os campos devem ser preenchidos.');
        //return;
    //}

    const sql = `INSERT INTO cadelog (primeironome, sobrenome, usuario, estado, cpf, cep) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [primeiro, sobrenome, usuario, estado, cpf, cep], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).send('Erro ao salvar os dados.');
            return;
        }
        console.log('Dados inseridos com sucesso!');
        res.status(200).send('Dados salvos com sucesso.');
    });
});
//----------------------------------------------------- CADASTRO -----------------------------------------------------//


app.put('/api/vendas/:id', (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        res.status(400).send('ID do produto não fornecido.');
        return;
    }

    const { nomeProduto, precoProduto, tamanhoProduto, pesoProduto, imagemProduto, disponivelProduto, categoriaProduto, estoqueProduto } = req.body;

    const sql = `UPDATE produtos SET nome = ?, preco = ?, tamanho = ?, peso = ?, imagem = ?, disponivel = ?, categoria = ?, estoque = ? WHERE idprodutos = ?`;
    connection.query(sql, [nomeProduto, precoProduto, tamanhoProduto, pesoProduto, imagemProduto, disponivelProduto, categoriaProduto, estoqueProduto, id], (err, result) => {
        if (err) {
            console.error('Erro ao editar produto:', err);
            res.status(500).send('Erro ao editar o produto.');
            return;
        }
        console.log('Produto editado com sucesso!');
        res.status(200).send('Produto editado com sucesso.');
    });
});





// Rota para obter a lista de produtos
app.get('/api/vendas', (req, res) => {
    const sql = 'SELECT * FROM produtos'; // Query para selecionar todos os produtos
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos do banco de dados:', err);
            res.status(500).send('Erro ao buscar os produtos.');
            return;
        }
        console.log('Produtos recuperados com sucesso!');
        res.status(200).json(results); // Retorna os resultados da consulta como JSON
    });
});


app.delete('/api/vendas/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM produtos WHERE idprodutos = ?`;
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erro ao excluir produto:', err);
            res.status(500).send('Erro ao excluir o produto.');
            return;
        }
        console.log('Produto excluído com sucesso!');
        res.status(200).send('Produto excluído com sucesso.');
    });
});




//------------------------------------------------------- VENDAS -------------------------------------------------------//

app.post('/api/vendas', (req, res) => {
    const { nomeProduto, precoProduto, tamanhoProduto, pesoProduto, imagemProduto, disponivelProduto, categoriaProduto, estoqueProduto } = req.body;

    const sql = `INSERT INTO produtos (nome, preco, tamanho, peso, imagem, disponivel, categoria, estoque) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [nomeProduto, precoProduto, tamanhoProduto, pesoProduto, imagemProduto, disponivelProduto, categoriaProduto, estoqueProduto], (err, result) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).send('Erro ao salvar os dados.');
            return;
        }
        console.log('Dados de venda inseridos com sucesso!');
        res.status(200).json({ message: 'Dados salvos com sucesso.' });

    });
});
//------------------------------------------------------- VENDAS -------------------------------------------------------//

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Node.js iniciado na porta ${PORT}`);
});


