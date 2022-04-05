require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY + 'fasf');

(async () => {
    try {
        const customers = await stripe.customers.list();
        console.log(customers);
        process.exit(0);
    } catch {
        process.exit(1);
    }
})();
