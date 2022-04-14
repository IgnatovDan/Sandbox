const prefix = 'SessionPriceId'
const customers = [
    {
        id: 'customer_1',
        name: prefix + 'Subscription_1 Customer_1',
        //stripeId: 'xxx'
    }
];

const products = [
    {
        id: 'product_1',
        name: prefix + 'Subscription_1 Product_1',
        //stripeId: 'xxx'
    },
    {
        id: 'product_2',
        name: prefix + 'Subscription_1 Product_2'
    },
];

// See also: lookup_key + transfer_lookup_key - https://stripe.com/docs/api/prices/create#create_price-lookup_key
const prices = [
    {
        priceInCents: 20001,
        productId: 'product_1',
        active: true,
        recurring: { interval: 'month' },
        isDefault: true,
        //stripeId: 'xxx'
    },
    {
        priceInCents: 20001,
        productId: 'product_1',
        active: true,
        recurring: { interval: 'day' }
        //stripeId: 'xxx'
    },
    {
        priceInCents: 70000,
        productId: 'product_2',
        active: true,
        isDefault: true,
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

    for (const customer of customers) {
        let stripeCustomer = await searchCustomerByName(customer.name);
        if (!stripeCustomer) {
            console.log('\r\ncreate customer: ' + customer.name);
            stripeCustomer = await stripe.customers.create({
                name: customer.name
            });
        }
        customer.stripeId = stripeCustomer.id;
        stripeCustomers.push(stripeCustomer);
    }

    console.log('stripeCustomers ensured');
    //console.log(stripeCustomers);

    for (const product of products) {
        let stripeProduct = await searchProductByName(product.name);
        if (!stripeProduct) {
            console.log('create product: ' + product.name);
            stripeProduct = await stripe.products.create({
                name: product.name,

            });
        }
        product.stripeId = stripeProduct.id;
        stripeProducts.push(stripeProduct);
    }

    console.log('stripeProducts ensured');

    // Can produce the 'Too many Requests' error if there are many items
    await Promise.all(prices.map(async price => {
        const product = products.find(item => item.id === price.productId);

        let stripePrice = (await stripe.prices.list({
            product: product.stripeId,
            active: price.active,
            unit_amount: price.priceInCents,
            currency: 'usd'
        })).data[0];

        if (!stripePrice) {
            console.log('create price: ' + JSON.stringify(price));
            stripePrice = await stripe.prices.create({
                active: price.active,
                product: product.stripeId,
                unit_amount: price.priceInCents,
                currency: 'usd',
                recurring: price.recurring,
                metadata: {
                    default: price.isDefault,
                }
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
