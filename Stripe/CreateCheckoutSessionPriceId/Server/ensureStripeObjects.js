const prefix = 'SessionPriceId'
const customers = [
  {
    id: 'customer_1',
    name: prefix + ' Customer_1',
    email: 'customer_1@test.com',
    //stripeId: 'xxx'
  },
];

const products = [
  {
    id: 'product_1',
    name: prefix + ' Product_1',
    //stripeId: 'xxx'
  },
  {
    id: 'product_2',
    name: prefix + ' Product_2',
  },
];

// See also: lookup_key + transfer_lookup_key - https://stripe.com/docs/api/prices/create#create_price-lookup_key
// But in my tests, lookup_key was managed in stripe as a 'global' mark, one for all prices
const prices = [
  {
    priceInCents: 20001,
    productId: 'product_1',
    active: true,
    //recurring: { interval: 'month' },
    isDefault: true,
    //stripeId: 'xxx'
  },
  {
    priceInCents: 30003,
    productId: 'product_1',
    active: true,
    //recurring: { interval: 'day' }
    //stripeId: 'xxx'
  },
  {
    priceInCents: 70000,
    productId: 'product_2',
    active: true,
    isDefault: true,
  },
];

const purchases = [
  //
  // This list can be filled using webhooks: creat a new entry in the 'paid' event handler for checkout session/payment intent
  // I fill it on the server start because I don't want to introduce DB into the project
  //
  // {
  //   productId: xxx,
  //   customerId: xxx,
  // },
];

async function ensureStripeObjects(stripe) {
  console.log('> ensureStripeObjects');

  async function searchCustomerByName(name) {
    // TODO: 'stripe.search' result is delayed and doesn't return the created entries immediately
    // return await stripe.customers.search({
    //     query: `name:"${customerName}"`,
    // });
    //
    // use list().data.find instead:
    return (await stripe.customers.list()).data.find((item) => item.name === name);
  }

  async function searchProductByName(name) {
    return (await stripe.products.list()).data.find((item) => item.name === name);
  }

  for (const customer of customers) {
    let stripeCustomer = await searchCustomerByName(customer.name);
    if (!stripeCustomer) {
      console.log('\r\ncreate customer: ' + customer.name);
      stripeCustomer = await stripe.customers.create({
        name: customer.name,
      });
    }
    customer.stripeId = stripeCustomer.id;
  }

  console.log('stripeCustomers ensured');

  for (const product of products) {
    let stripeProduct = await searchProductByName(product.name);
    if (!stripeProduct) {
      console.log('create product: ' + product.name);
      stripeProduct = await stripe.products.create({
        name: product.name,
      });
    }
    product.stripeId = stripeProduct.id;
  }

  console.log('> reading purchases from stripe');
  await Promise.all(
    (
      await stripe.checkout.sessions.list()
    ).data.map(async (item) => {
      return await stripe.checkout.sessions
        .retrieve(item.id, {
          expand: ['line_items'],
        })
        .then((session) => {
          if (session.payment_status === 'paid') {
            const result = session.line_items.data.map((lineItem) => {
              const customer = customers.find((item) => item.stripeId === session.customer);
              const product = products.find((product) => product.stripeId === lineItem.price.product);
              if (customer && product) {
                return {
                  customerId: customer.id,
                  productId: product.id,
                };
              } else {
                return null;
              }
            });
            purchases.push(...result.filter((item) => item));
          }
          return Promise.resolve(true);
        });
    })
  );
  console.log(`> ${purchases.length} purchases were read from stripe`);

  // Can produce the 'Too many Requests' error if there are many items
  await Promise.all(
    prices.map(async (price) => {
      const product = products.find((item) => item.id === price.productId);

      let stripePrice = (
        await stripe.prices.list({
          product: product.stripeId,
          active: price.active,
          unit_amount: price.priceInCents,
          currency: 'usd',
        })
      ).data[0];

      if (!stripePrice) {
        console.log('create price: ' + JSON.stringify(price));
        stripePrice = await stripe.prices.create({
          active: price.active,
          product: product.stripeId,
          unit_amount: price.priceInCents,
          currency: 'usd',
          recurring: price.recurring,
          metadata: {
            default: price.isDefault, // stripe doesn't create 'metadata' property if Boolean(false) is passed
          },
        });
      }
      price.stripeId = stripePrice.id;
    })
  );
  console.log('stripePrices ensured');

  console.log('< ensureStripeObjects');
}

module.exports = {
  ensureStripeObjects,
  products,
  customers,
  prices,
  purchases,
};
