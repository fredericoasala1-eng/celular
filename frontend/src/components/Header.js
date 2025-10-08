import React from 'react';
import './Header.css';

const Header = () => (
  <header className="app-header">
    <div className="logo">EletronicStore</div>
    <nav>
      <a href="#produtos">Produtos</a>
      <a href="#carrinho">Carrinho</a>
      <a href="#contato">Contato</a>
    </nav>
  </header>
);

export default Header;
