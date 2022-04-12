require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { ensureStripeObjects, stripeCustomers, stripeProducts, products } = require('./ensureStripeObjects');

// TODO: await createStripeObjects(stripe); - await is only valid in async functions and the top level bodies of modules
ensureStripeObjects(stripe);

const app = express();

app.use(express.json());

//
// Instead, I used "proxy": "http://localhost:3001", in package.json in React app
//
// const cors = require('cors');
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

app.post('/create-checkout-session-price-in-query', async (req, res) => {
    // price data directly in query
    // https://www.youtube.com/watch?v=1r-F3FIONl8
    console.log('> create-checkout-session');
    console.log(req.body);

    try {
        const line_items = Object.keys(req.body).map(key => {
            return {
                price_data: {
                    //
                    // WARNING: Instead, use 'priceId', see https://stripe.com/docs/billing/subscriptions/build-subscriptions
                    //
                    // I don't understand whether stripe creates a new product for each request and how it manages the created products
                    // In the created payment at https://dashboard.stripe.com/test/payments 
                    // I see that a new 'archived' product was created and linked to this payment
                    // And, it is used in subsequent payments
                    currency: 'usd',
                    product_data: {
                        name: stripeProducts[key].name
                    },
                    unit_amount: products[key].priceInCents
                },
                quantity: req.body[key].quantity
                // There is no customer id and a new customer will be created
                // when the payment page is submitted(there are Name/ email editors)
            }
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: 'http://localhost:3000/payment_success.html', // use process.env to specify both the production and development values
            cancel_url: 'http://localhost:3000/payment_cancel.html',
        });
        console.log('session.url: ' + session.url);
        res.json({ url: session.url });
    }
    catch (e) {
        console.log('catch(e)');
        console.log(e);
        res.status(500).json({ error: e.message });
    }

    console.log('< create-checkout-session');
});

app.listen(3001);
