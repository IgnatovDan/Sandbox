require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { ensureStripeObjects, stripeCustomers, stripeProducts, products } = require('./ensureStripeObjects');

// TODO: await createStripeObjects(stripe); - await is only valid in async functions and the top level bodies of modules
ensureStripeObjects(stripe);

const app = express();

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        express.json()(req, res, next);
    }
});

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
            success_url: 'http://localhost:3000/payment_success.html?session_id={CHECKOUT_SESSION_ID}', // use process.env to specify both the production and development values
            cancel_url: 'http://localhost:3000/payment_cancel.html?session_id={CHECKOUT_SESSION_ID}',
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

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    console.log(`> webhook`);
    const sig = req.headers["stripe-signature"];

    // This is your Stripe CLI webhook secret for testing your endpoint locally.
    const webhookSecret = "whsec_e31c1622d5934708dcc304e13dabe856b1b00a1c1714317f55e2b6c31e78286d";

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        // On error, log and return the error message
        console.log(`❌ Error message: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);
    //const paymentIntent = event.data.object;
    console.log(event.type);

    // Handle the event
    switch (event.type) {
        case 'payment_intent.created':
            //console.log('payment_intent.created');
            break;
        case 'payment_intent.succeeded':
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
        //console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});

app.listen(3001);
