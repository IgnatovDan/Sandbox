require('dotenv').config({ path: './.env' });
const app = require('express')();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
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

app.listen(1234, () => console.log('Listening on the 1234 port'));
