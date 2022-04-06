require('dotenv').config();

const stripe = require('stripe')();

console.log('Starting...');
(async () => {
    console.log('> Get Customers');
    const customers = await stripe.customers.list({}, {
        // Set key 'per request'
        apiKey: process.env.STRIPE_SECRET_KEY
    });
    console.log(customers);
    console.log('< Get Customers');
})();

