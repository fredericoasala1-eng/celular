import React, { useState } from 'react';
import './Payment.css';

const Payment = ({ cartItems, onBackToCart, onFinishPayment }) => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.preco * item.quantity, 0).toFixed(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const paymentData = {
      cardName,
      cardNumber,
      expiryDate,
      cvv,
      total: getTotalPrice(),
      items: cartItems,
    };

    // Simulação de chamada ao backend
    fetch('https://celular-1.onrender.com/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.ok) {
        alert('Pagamento realizado com sucesso! Obrigado pela sua compra.');
        onFinishPayment();
      } else {
        alert('Erro no pagamento: ' + (data.error || 'Tente novamente.'));
      }
    })
    .catch(() => alert('Erro de conexão durante o pagamento.'));
  };

  return (
    <div className="payment-container">
      <h2>Pagamento</h2>
      <div className="order-summary">
        <h3>Resumo do Pedido</h3>
        {cartItems.map(item => (
          <div key={item.id} className="summary-item">
            <span>{item.nome} (x{item.quantity})</span>
            <span>R$ {(item.preco * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="summary-total">
          <strong>Total:</strong>
          <strong>R$ {getTotalPrice()}</strong>
        </div>
      </div>

      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <h3>Dados do Cartão de Crédito</h3>
        <input type="text" value={cardName} onChange={e => setCardName(e.target.value)} placeholder="Nome no cartão" required />
        <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} placeholder="Número do cartão" required />
        <div className="card-details">
          <input type="text" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} placeholder="Validade (MM/AA)" required />
          <input type="text" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="CVV" required />
        </div>
        <button type="submit" className="pay-button">Pagar Agora</button>
      </form>
      <button onClick={onBackToCart} className="back-button">Voltar ao Carrinho</button>
    </div>
  );
};

export default Payment;
