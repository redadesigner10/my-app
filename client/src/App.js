import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.reduce((acc, item) => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []));
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Checkout successful:', data);
        alert('Checkout successful!');
        setCart([]); // Clear cart after successful checkout
      })
      .catch(error => {
        console.error('Error during checkout:', error);
        alert('Checkout failed. Please try again.');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Point of Sale</h1>
      </header>
      <main className="container">
        <div className="products-section">
          <h2>Products</h2>
          <div className="product-list">
            {products.map(product => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
        <div className="cart-section">
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul>
                {cart.map(item => (
                  <li key={item.id} className="cart-item">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <p>Total Items: {getTotalItems()}</p>
                <p>Subtotal: ${getSubtotal().toFixed(2)}</p>
                <h3>Total: ${getSubtotal().toFixed(2)}</h3> {/* Assuming no tax/discounts for simplicity */}
                <button onClick={handleCheckout} className="checkout-button" disabled={cart.length === 0}>
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

