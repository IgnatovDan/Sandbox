require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

console.log('Starting...');
(async () => {
    console.log('> Get Customer');
    const customer1 = await stripe.customers.retrieve('cus_LS1oQLpzydWGTu');
    console.log(customer1); // "name: 'Customer1'," and a lot of other info are logged
    console.log('< Get Customer');
})();

