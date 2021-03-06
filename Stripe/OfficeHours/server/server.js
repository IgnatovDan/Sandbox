// Replace if using a different env file or config
require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const { resolve } = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

app.use(express.static(process.env.STATIC_DIR));
// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
  } else {
    bodyParser.json()(req, res, next);
  }
});

// https://github.com/stripe-samples/developer-office-hours/tree/master/starter

app.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodType, currency } = req.body;
  console.log(paymentMethodType);
  console.log(currency);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1234,
      currency,
      payment_method_types: [paymentMethodType],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({ error: { message: e.message } });
  }
});

// For deployed env
// In local env run 'npm run start' in './client/'
// app.get("/", (req, res) => {
//   const path = resolve(process.env.STATIC_DIR + "/index.html");
//   res.sendFile(path);
// });

app.get("/config", (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// Stripe requires the raw body to construct the event
app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

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

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
);

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
