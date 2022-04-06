require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('Starting...');
(async () => {
    console.log('> Get Customers');

    const customers = await stripe.customers.list();
    console.log(customers); // TODO: why the list is empty? "{ object: 'list', data: [], has_more: false, url: '/v1/customers' }"
    console.log('< Get Customers');
})();

