require('dotenv').config({ path: './.env' });
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const bodyParser = require("body-parser");

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodType, currency } = req.body ?? { currency: 'usd' };

    console.log(paymentMethodType);
    console.log(currency);


    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1234,
        currency,
        payment_method_types: [paymentMethodType]
    });

    res.json({ clientSecret: paymentIntent.client_secret });
});

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers["stripe-signature"];
    console.log(`> webhook`);

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
    const paymentIntent = event.data.object;
    console.log(paymentIntent);

    // Handle the event
    switch (event.type) {
        case 'payment_intent.created':
            console.log('payment_intent.created');
            break;
        case 'payment_intent.succeeded':
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});

app.listen(1234, () => console.log('Listening on the 1234 port'));
