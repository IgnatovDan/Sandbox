const cors = require('cors');

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { ensureStripeObjects, customers, products } = require('./ensureStripeObjects');

ensureStripeObjects(stripe);

const app = express();
app.use(cors());

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.get('/customers', async (req, res) => {
  res.json(customers);
});

app.get('/customers/:id', async (req, res) => {
  const id = req.params.id;
  const customer = customers.find((item) => item.id === id);
  if (!customer) {
    res.status(404).json({ message: `${id} item was not found` });
  } else {
    res.json(customer);
  }
});

app.get('/products', async (req, res) => {
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = products.find((item) => item.id === id);
  if (!product) {
    res.status(404).json({ message: `${id} item was not found` });
  } else {
    res.json(product);
  }
});
  
app.get('/productDefaultPrice/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = products.find(item => item.id === productId);
    if (!product) {
      res.status(404).json({ message: `Product ${productId} was not found` });
    }
    // Introduce intermediate cache to improve performance (renew cache using webhook)
    // Instead, use stripe.prices.search({ query: `metadata:"default:true"` }); ???
    const prices = await stripe.prices.list({
      product: product.stripeId,
      active: true,
    });
    const price = prices.data.find(item => item.metadata?.default);
    if (!price) {
      res.status(404).json({ message: `Default price for ${id} product was not found` });
    } else {
      res.json({ cost: (price.unit_amount / 100), currency: price.currency });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.listen(3001);
