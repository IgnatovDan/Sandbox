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

require('./handlers/customers')(app, stripe);
require('./handlers/products')(app);
require('./handlers/product-default-price')(app, stripe);
require('./handlers/create-checkout-session-price-id')(app, stripe);
// TODO: require('./handlers/get-payment-intents-by-customer-id')(app, stripe);

// TODO: add webhook to add purchases into localDB (queries to stripe database seems to be very slow and a copy in localDB is required)

app.listen(3001);
