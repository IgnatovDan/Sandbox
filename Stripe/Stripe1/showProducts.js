require('dotenv').config();

// Set key globally
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('Starting...');
(async () => {
    console.log('> Get Products');

    console.log(await stripe.products.list());

    console.log('< Get Products');
})();

