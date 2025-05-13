const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

const products = [
  { id: 1, name: 'Laptop', price: 1200, image: 'https://via.placeholder.com/150/0000FF/808080?Text=Laptop' },
  { id: 2, name: 'Keyboard', price: 75, image: 'https://via.placeholder.com/150/008000/FFFFFF?Text=Keyboard' },
  { id: 3, name: 'Mouse', price: 25, image: 'https://via.placeholder.com/150/FF0000/FFFFFF?Text=Mouse' },
  { id: 4, name: 'Monitor', price: 300, image: 'https://via.placeholder.com/150/FFFF00/000000?Text=Monitor' },
  { id: 5, name: 'Webcam', price: 50, image: 'https://via.placeholder.com/150/000000/FFFFFF?Text=Webcam' },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/checkout', (req, res) => {
  const cart = req.body;
  console.log('Checkout request received:', cart);
  // In a real application, you would process the payment and save the order here
  res.json({ success: true, message: 'Checkout successful!', order: cart });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
