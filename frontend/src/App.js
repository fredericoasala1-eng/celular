import React, { useState, useEffect } from 'react';
import './App.css';

// Componentes que vamos criar
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isModerator, setIsModerator] = useState(false);

  // Simples verificação de moderador (apenas para exemplo)
  // A lógica real de IP estaria no backend
  useEffect(() => {
    // Para testar, você pode adicionar ?moderador=true na URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('moderador') === 'true') {
      setIsModerator(true);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <main>
        {isModerator && <AdminPanel />}
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
