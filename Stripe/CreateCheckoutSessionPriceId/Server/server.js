const cors = require('cors');

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { ensureStripeObjects, customers } = require('./ensureStripeObjects');

ensureStripeObjects(stripe);

const app = express();
app.use(cors());

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.get('/customers', async (req, res) => {
    res.json(customers);
});

app.listen(3001);
