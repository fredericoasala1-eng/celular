import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    fetch('https://celular-1.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        onLogin(data.token);
        navigate('/admin'); // Redireciona para o painel do admin
      } else {
        setError(data.error || 'Credenciais inválidas');
      }
    })
    .catch(() => setError('Erro de conexão ao tentar fazer login.'));
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Acesso do Moderador</h2>
        {error && <p className="error-message">{error}</p>}
        <input 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Usuário" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Senha" 
          required 
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
