require('dotenv').config();

// Set key globally
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')();

console.log(process.env.STRIPE_SECRET_KEY);

console.log('Starting...');
(async () => {
    console.log('> Get Customers');
    const customers = await stripe.customers.list({}, {
        // Set key 'per request'
        apiKey: process.env.STRIPE_SECRET_KEY
    });
    console.log(customers); // TODO: why there is no customers? "{ object: 'list', data: [], has_more: false, url: '/v1/customers' }"
    console.log('< Get Customers');

    console.log('> Get Customer');
    const customer1 = await stripe.customers.retrieve('cus_LS1oQLpzydWGTu', {
        apiKey: process.env.STRIPE_SECRET_KEY
    });
    console.log(customer1); // "name: 'Customer1'," and a lot of other info is printed
    console.log('< Get Customer');
})()

