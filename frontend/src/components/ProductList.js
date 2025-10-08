import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/produtos')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div className="product-list" id="produtos">
      <h2>Nossos Produtos</h2>
      <div className="products-grid">
        {products.length > 0 ? products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imagem || 'https://via.placeholder.com/280x200'} alt={product.nome} />
            <div className="product-card-content">
              <h3>{product.nome}</h3>
              <p>{product.descricao}</p>
              <span className="price">R$ {product.preco.toFixed(2)}</span>
              <button onClick={() => onAddToCart(product)}>Adicionar ao Carrinho</button>
            </div>
          </div>
        )) : <p>Nenhum produto cadastrado no momento.</p>}
      </div>
    </div>
  );
};

export default ProductList;
