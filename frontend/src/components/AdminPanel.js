import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { nome, descricao, preco: parseFloat(preco), imagem };

    fetch('https://celular-1.onrender.com/produtos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        alert('Produto cadastrado com sucesso!');
        // Limpar formulário
        setNome(''); setDescricao(''); setPreco(''); setImagem('');
        window.location.reload(); // Recarrega para ver o novo produto
      } else {
        alert('Erro ao cadastrar: ' + (data.error || 'Verifique o console'));
      }
    })
    .catch(err => alert('Acesso negado ou erro de conexão. Você é um moderador?'));
  };

  return (
    <div className="admin-panel">
      <h2>Painel do Moderador - Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome do produto" required />
        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" required />
        <input type="number" value={preco} onChange={e => setPreco(e.target.value)} placeholder="Preço" required />
        <input type="text" value={imagem} onChange={e => setImagem(e.target.value)} placeholder="URL da imagem" />
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default AdminPanel;
