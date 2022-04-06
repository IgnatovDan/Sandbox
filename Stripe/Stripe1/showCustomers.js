require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('Starting...');
(async () => {
    console.log('> Get Customers');

    const customers = await stripe.customers.list({ limit: 3 });
    console.log(customers); // TODO: Doesn't show customer that was created in web ui, shows customers created via API
    console.log('< Get Customers');
})();

