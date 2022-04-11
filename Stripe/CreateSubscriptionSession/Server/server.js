require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const ensureStripeObjects = require('./ensureStripeObjects');

// TODO: await createStripeObjects(stripe); - await is only valid in async functions and the top level bodies of modules
ensureStripeObjects(stripe);

const app = express();

app.use(express.json());

app.listen(3001);
