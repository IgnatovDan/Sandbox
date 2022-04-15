const cors = require('cors');

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { ensureStripeObjects, customers, products, prices } = require('./ensureStripeObjects');

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
    const product = products.find((item) => item.id === productId);
    if (!product) {
      res.status(404).json({ message: `Product ${productId} was not found` });
    }
    // Introduce intermediate cache to improve performance (renew cache using webhook)
    // Instead, use stripe.prices.search({ query: `metadata:"default:true"` }); ???
    const prices = await stripe.prices.list({
      product: product.stripeId,
      active: true,
    });
    const price = prices.data.find((item) => item.metadata?.default);
    if (!price) {
      res.status(404).json({ message: `Default price for ${id} product was not found` });
    } else {
      res.json({ cost: price.unit_amount / 100, currency: price.currency });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post('/create-checkout-session-price-id', async (req, res) => {
  console.log('> create-checkout-session');
  console.log(req.body);

  try {
    const { productId, customerId, successUrl, cancelUrl } = req.body;
    if (!productId) throw { error: 'productId is empty' };
    if (!customerId) throw { error: 'customerId is empty' };

    const defaultPrice = prices.find((item) => item.isDefault && item.productId === productId);
    if (!defaultPrice) throw { error: 'defaultPrice is not found' };

    const customer = customers.find((item) => item.id === customerId);
    if (!customer) throw { error: 'customer is not found' };

    const session = await stripe.checkout.sessions.create({
      customer: customer.stripeId,
      line_items: {
        price: defaultPrice.stripeId,
        quantity: 1,
      },
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: successUrl && `http://localhost:3000/${successUrl}?session_id={CHECKOUT_SESSION_ID}`, // use process.env to specify both the production and development values
      cancel_url: cancelUrl && `http://localhost:3000/${cancelUrl}?session_id={CHECKOUT_SESSION_ID}`,
    });

    console.log('session.url: ' + session.url);
    res.json({ url: session.url });
  } catch (e) {
    console.log('catch(e)');
    console.log(e);
    res.status(500).json({ error: e.message });
  }

  console.log('< create-checkout-session');
});

// TODO: add webhook to add purchases into localDB (queries to stripe database seems to be very slow and a copy in localDB is required)

app.listen(3001);
