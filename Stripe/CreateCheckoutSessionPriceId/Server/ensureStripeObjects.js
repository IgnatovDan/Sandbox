const prefix = 'SessionPriceId'
const customers = {
    customer_1: {
        name: prefix + 'Subscription_1 Customer_1',
    }
};

const products = {
    product_1: {
        name: prefix + 'Subscription_1 Product_1',
        //stripeId: 'xxx'
    },
    product_2: {
        name: prefix + 'Subscription_1 Product_2'
    },
};

// See also: lookup_key + transfer_lookup_key - https://stripe.com/docs/api/prices/create#create_price-lookup_key
const prices = [
    {
        priceInCents: 20001,
        productId: 'product_1',
        active: true,
        recurring: { interval: 'month' }
        //stripeId: 'xxx'
    },
    {
        priceInCents: 20001,
        productId: 'product_1',
        active: false,
        recurring: { interval: 'day' }
        //stripeId: 'xxx'
    },
    {
        priceInCents: 70000,
        productId: 'product_2',
        active: true,
    }
];

const stripeCustomers = [];
const stripeProducts = [];
const stripePrices = [];

async function ensureStripeObjects(stripe) {
    console.log('> ensureStripeObjects');

    async function searchCustomerByName(name) {
        // TODO: 'stripe.search' result is delayed and doesn't return the created entries immediately
        // return await stripe.customers.search({
        //     query: `name:"${customerName}"`,
        // });
        //
        // use list().data.find instead:
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
        customers[memberName].stripeId = stripeCustomer.id;
        stripeCustomers.push(stripeCustomer);
    }

    console.log('stripeCustomers ensured');
    //console.log(stripeCustomers);

    for (const memberName in products) {
        const name = products[memberName].name;
        let stripeProduct = await searchProductByName(name);
        if (!stripeProduct) {
            console.log('create product: ' + name);
            stripeProduct = await stripe.products.create({
                name
            });
        }
        products[memberName].stripeId = stripeProduct.id;
        stripeProducts.push(stripeProduct);
    }

    console.log('stripeProducts ensured');

    // Can produce the 'Too many Requests' error if there are many items
    await Promise.all(prices.map(async price => {
        const product = products[price.productId];

        let stripePrice = (await stripe.prices.list({
            product: product.stripeId,
            active: price.active,
            unit_amount: price.priceInCents,
            currency: 'usd'
        })).data[0];

        console.log('stripePrice: ' + stripePrice && JSON.stringify(stripePrice));
        if (!stripePrice) {
            stripePrice = await stripe.prices.create({
                active: price.active,
                product: product.stripeId,
                unit_amount: price.priceInCents,
                currency: 'usd',
                recurring: price.recurring,
            });
        }
        price.stripeId = stripePrice.id;
        stripePrices.push(stripePrice);
    }));
    console.log('stripePrices ensured');

    console.log('< ensureStripeObjects');
}

module.exports = {
    ensureStripeObjects,
    //stripeCustomers,
    //stripeProducts,
    products,
    customers
};
