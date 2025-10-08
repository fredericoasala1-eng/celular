import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ cartCount, onCartClick, onLogoClick, isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/'); // Redireciona para a página inicial após o logout
  };

  return (
    <header className="app-header">
      <div className="logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
        <Link to="/">EletronicStore</Link>
      </div>
      <nav>
        <a href="#produtos" onClick={(e) => { e.preventDefault(); onLogoClick(); }}>Produtos</a>
        <a href="#carrinho" onClick={(e) => { e.preventDefault(); onCartClick(); }}>
          Carrinho {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </a>
        <a href="#contato">Contato</a>
        {isLoggedIn ? (
          <button onClick={handleLogoutClick} className="logout-button">Sair</button>
        ) : (
          <Link to="/login" className="login-link">Admin</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
