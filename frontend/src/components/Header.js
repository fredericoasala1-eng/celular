import React from 'react';
import './Header.css';

const Header = ({ cartCount, onCartClick, onLogoClick }) => (
  <header className="app-header">
    <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>EletronicStore</div>
    <nav>
      <a href="#produtos" onClick={(e) => { e.preventDefault(); onLogoClick(); }}>Produtos</a>
      <a href="#carrinho" onClick={(e) => { e.preventDefault(); onCartClick(); }}>
        Carrinho {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </a>
      <a href="#contato">Contato</a>
    </nav>
  </header>
);

export default Header;
