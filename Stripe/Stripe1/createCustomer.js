require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('Starting...');
(async () => {
    console.log('> Create Customer');

    const customer = await stripe.customers.create({
        description: 'new customer from api_' + new Date(Date.now()).toUTCString()
    });
    console.log(customer); // TODO: why the list is empty? "{ object: 'list', data: [], has_more: false, url: '/v1/customers' }"
    console.log('< Create Customer');
})();

