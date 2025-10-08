// Backend inicial Node.js + Express
// Rodar: npm install express sqlite3 cors jsonwebtoken bcryptjs

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

// Chave secreta para o JWT. Em um app real, use uma variável de ambiente.
const JWT_SECRET = 'sua-chave-secreta-super-segura';

// Credenciais do moderador
const MODERATOR_USERNAME = 'admin';
// Hash para a senha "admin123". Gere um novo para produção.
const MODERATOR_PASSWORD_HASH = '$2a$10$Y.TR5.gY9/C5Zz.p9.i1x.sohvykfzX6f/E4.O.e.g/a.zJ/Z.z9S';


app.use(cors());
app.use(express.json());

const path = require('path');

// Banco de dados SQLite
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

// Middleware para autenticar o token JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // Se não há token, não autorizado

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token não é válido, acesso proibido
    req.user = user;
    next();
  });
}

// --- ROTAS ---

// Rota de Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === MODERATOR_USERNAME && bcrypt.compareSync(password, MODERATOR_PASSWORD_HASH)) {
    // Usuário e senha corretos, gerar token
    const user = { name: username };
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token: accessToken });
  } else {
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
});


// Rotas públicas
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Cadastro de produto (agora protegido por token)
app.post('/produtos', authenticateToken, (req, res) => {
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
