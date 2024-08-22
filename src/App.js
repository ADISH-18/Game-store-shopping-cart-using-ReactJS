import React, { useState } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import { products } from './data/productsData';
import { addToCart, getCart, removeFromCart } from './data/cardData';
import './components/cart.css';

function App() {
  const [cart, setCart] = useState(getCart());
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setCart(getCart());
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setCart(getCart());
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Games Store</h1>
        <button onClick={toggleCartVisibility}>
          {isCartVisible ? 'Hide Cart' : `View Cart (${cart.length})`}
        </button>
      </header>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>

      {isCartVisible && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map(product => (
                <li key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <span>{product.name}</span>
                  <span>${product.price.toFixed(2)}</span>
                  <button onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
