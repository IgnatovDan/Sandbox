require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const { ensureStripeObjects, stripeCustomers, stripeProducts, products } = require('./ensureStripeObjects');

// TODO: await createStripeObjects(stripe); - await is only valid in async functions and the top level bodies of modules
ensureStripeObjects(stripe);

const app = express();

app.use(express.json());

//
// Or, use "proxy": "http://localhost:3001", in package.json in React app
//
// app.use(
//     // Access to fetch at 'http://localhost:3001/create-checkout-session' from origin 'http://localhost:3000' 
//     // has been blocked by CORS policy: Response to preflight request doesn't pass access control check: 
//     // No 'Access - Control - Allow - Origin' header is present on the requested resource.
//     // If an opaque response serves your needs, set the request's mode to 'no - cors' 
//     // to fetch the resource with CORS disabled.
//     cors({
//         origin: "http://localhost:3000"
//     })
// );

app.post('/create-checkout-session', async (req, res) => {
    console.log('> create-checkout-session');
    console.log(req.body);

    try {
        const line_items = Object.keys(req.body).map(key => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: stripeProducts[key].name
                    },
                    unit_amount: products[key].priceInCents
                },
                quantity: req.body[key].quantity
            }
        });

        const session = stripe.checkout.sessions.create({
            line_items,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/payment_success.html', // use process.env to specify both the production and development values
            cancel_url: 'http://localhost:3000/payment_cancel.html',
        });
        res.json({ url: session.url });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: e.message });
    }

    console.log('< create-checkout-session');
});

app.listen(3001);
