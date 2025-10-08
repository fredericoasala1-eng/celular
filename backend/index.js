// Backend inicial Node.js + Express
// Rodar: npm install express sqlite3 cors

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Lista de IPs moderadores (adicione o seu IP aqui)
const MODERATOR_IPS = ['127.0.0.1'];

const path = require('path');

// Banco de dados SQLite em um disco persistente
// No Render, vamos montar um disco em '/var/data'
const dbPath = process.env.NODE_ENV === 'production' ? '/var/data/db.sqlite' : './db.sqlite';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite em", dbPath);
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    descricao TEXT,
    preco REAL,
    imagem TEXT
  )`);
});

function isModerator(req) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return MODERATOR_IPS.includes(ip.replace('::ffff:', ''));
}

// Rotas públicas
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Cadastro de produto (só moderador)
app.post('/produtos', (req, res) => {
  if (!isModerator(req)) return res.status(403).json({ error: 'Acesso negado' });
  const { nome, descricao, preco, imagem } = req.body;
  db.run('INSERT INTO produtos (nome, descricao, preco, imagem) VALUES (?, ?, ?, ?)', [nome, descricao, preco, imagem], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Compra de produto (simples, só registra intenção)
app.post('/comprar', (req, res) => {
  const { produtoId, nome, contato } = req.body;
  // Aqui você pode registrar a compra em outro banco/tabela
  res.json({ ok: true, mensagem: 'Compra registrada! Entraremos em contato.' });
});

// Rota de contato
app.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  // Em um app real, você enviaria um e-mail ou salvaria no DB
  console.log(`Nova mensagem de contato de ${nome} (${email}): ${mensagem}`);
  res.json({ ok: true });
});

// Rota de checkout (simulação)
app.post('/checkout', (req, res) => {
  const { cardName, items, total } = req.body;
  // Em um app real, você processaria o pagamento com um gateway
  console.log(`Nova compra de ${cardName} no valor de R$ ${total}`);
  console.log('Itens:', items.map(i => `${i.quantity}x ${i.nome}`).join(', '));
  
  // Simula sucesso ou falha aleatoriamente
  if (Math.random() > 0.1) { // 90% de chance de sucesso
    res.json({ ok: true, message: 'Pagamento aprovado!' });
  } else {
    res.status(400).json({ ok: false, error: 'Falha na comunicação com o banco.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
