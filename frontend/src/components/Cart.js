import React from 'react';
import './Cart.css';

const Cart = ({ cartItems, onRemoveFromCart, onCheckout }) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.preco * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container" id="carrinho">
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.imagem || 'https://via.placeholder.com/100'} alt={item.nome} />
                <div className="item-details">
                  <h3>{item.nome}</h3>
                  <p>Quantidade: {item.quantity}</p>
                  <span className="price">R$ {(item.preco * item.quantity).toFixed(2)}</span>
                </div>
                <button onClick={() => onRemoveFromCart(item)}>Remover</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: R$ {getTotalPrice()}</h3>
            <button className="checkout-button" onClick={onCheckout}>Finalizar Compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
