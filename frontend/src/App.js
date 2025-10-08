import React, { useState, useEffect } from 'react';
import './App.css';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';
import Cart from './components/Cart';
import Payment from './components/Payment';

function App() {
  const [isModerator, setIsModerator] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('products'); // 'products', 'cart', 'payment'

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('moderador') === 'true') {
      setIsModerator(true);
    }
  }, []);

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
    <div className="App">
      <Header 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setView('cart')}
        onLogoClick={() => setView('products')}
      />
      <main>
        {isModerator && <AdminPanel />}
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}

export default App;

