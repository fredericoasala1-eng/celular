import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleContatoSubmit = (e) => {
    e.preventDefault();
    const contatoData = { nome, email, mensagem };

    fetch('https://celular-1.onrender.com/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contatoData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('Mensagem enviada com sucesso!');
        setNome(''); setEmail(''); setMensagem('');
      } else {
        alert('Erro ao enviar mensagem.');
      }
    })
    .catch(() => alert('Erro de conexão ao enviar mensagem.'));
  };

  return (
    <footer className="app-footer" id="contato">
      <div className="footer-content">
        <div className="contact-form">
          <h3>Entre em Contato</h3>
          <form onSubmit={handleContatoSubmit}>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" required />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" required />
            <textarea value={mensagem} onChange={e => setMensagem(e.target.value)} placeholder="Sua mensagem" required />
            <button type="submit">Enviar</button>
          </form>
        </div>
        <div className="copyright">
          <p>&copy; 2025 EletronicStore. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
