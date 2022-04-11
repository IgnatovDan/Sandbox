const customers = {
    customer_1: { name: 'Subscription_1 Customer_1' }
};
const products = {
    product_1: { priceInCents: 20000, name: 'Subscription_1 Product_1' },
    product_2: { priceInCents: 40000, name: 'Subscription_1 Product_2' },
};

const stripeCustomers = {};
const stripeProducts = [];

async function ensureStripeObjects(stripe) {
    console.log('> ensureStripeObjects');

    async function searchCustomerByName(name) {
        // TODO: 'stripe.search' is delayed and doesn't return the created entries immediately
        // return await stripe.customers.search({
        //     query: `name:"${customerName}"`,
        // });
        return (await stripe.customers.list()).data.find(item => item.name === name);
    }

    async function searchProductByName(name) {
        return (await stripe.products.list()).data.find(item => item.name === name);
    }

    for (const memberName in customers) {
        const name = customers[memberName].name;
        let stripeCustomer = await searchCustomerByName(name);
        if (!stripeCustomer) {
            console.log('\r\ncreate customer: ' + name);
            stripeCustomer = await stripe.customers.create({
                name
            });
        }
        stripeCustomers[memberName] = stripeCustomer;
    }

    console.log('\r\nstripeCustomers:');
    console.log(stripeCustomers);

    for (const memberName in products) {
        const name = products[memberName].name;
        let stripeProduct = await searchProductByName(name);
        if (!stripeProduct) {
            console.log('\r\ncreate product: ' + name);
            stripeProduct = await stripe.products.create({
                name
            });
        }
        stripeProducts[memberName] = stripeProduct;
    }

    console.log('\r\nstripeProducts:');
    console.log(stripeProducts);

    console.log('< ensureStripeObjects');
}

module.exports = ensureStripeObjects;
