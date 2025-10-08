import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import Payment from './components/Payment';
import Login from './components/Login';

// Componente para a página principal que agrupa produtos, carrinho e pagamento
const MainPage = ({ cartItems, view, handleAddToCart, handleRemoveFromCart, setView, handleFinishPayment }) => {
  const renderView = () => {
    switch (view) {
      case 'cart':
        return <Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} onCheckout={() => setView('payment')} />;
      case 'payment':
        return <Payment cartItems={cartItems} onBackToCart={() => setView('cart')} onFinishPayment={handleFinishPayment} />;
      case 'products':
      default:
        return <ProductList onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <>
      {renderView()}
    </>
  );
};

// Componente para rotas protegidas
const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


function App() {
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('products');

  const handleLogin = (newToken) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
  };

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    alert(`${product.nome} foi adicionado ao carrinho!`);
  };

  const handleRemoveFromCart = (productToRemove) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== productToRemove.id)
    );
  };

  const handleFinishPayment = () => {
    setCartItems([]);
    setView('products');
  };

  return (
    <Router>
      <div className="App">
        <Header 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onCartClick={() => setView('cart')}
          onLogoClick={() => setView('products')}
          isLoggedIn={!!token}
          onLogout={handleLogout}
        />
        <main>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute token={token}>
                  <AdminPanel token={token} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/" 
              element={
                <MainPage 
                  cartItems={cartItems}
                  view={view}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  setView={setView}
                  handleFinishPayment={handleFinishPayment}
                />
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

