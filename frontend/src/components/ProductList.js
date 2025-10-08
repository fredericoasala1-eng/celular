import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://celular-1.onrender.com/produtos')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erro ao buscar produtos:", err));
  }, []);

  const handleBuy = (product) => {
    // Lógica de compra simples
    alert(`Você demonstrou interesse em comprar ${product.nome}! Entraremos em contato.`);
    // Aqui poderia chamar o endpoint /comprar
  };

  return (
    <div className="product-list">
      <h2>Nossos Produtos</h2>
      <div className="products-grid">
        {products.length > 0 ? products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imagem || 'https://via.placeholder.com/150'} alt={product.nome} />
            <h3>{product.nome}</h3>
            <p>{product.descricao}</p>
            <span className="price">R$ {product.preco.toFixed(2)}</span>
            <button onClick={() => handleBuy(product)}>Comprar</button>
          </div>
        )) : <p>Nenhum produto cadastrado no momento.</p>}
      </div>
    </div>
  );
};

export default ProductList;
