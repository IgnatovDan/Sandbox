const { customers, purchases, products } = require('../ensureStripeObjects');

module.exports = function (app, stripe) {
  app.get('/customers', async (req, res) => {
    res.json(customers);
  });

  app.get('/customers/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) throw new Error('id is empty');

    const customer = customers.find((item) => item.id === id);
    if (!customer) {
      res.status(404).json({ message: `${id} item was not found` });
    } else {
      res.json(customer);
    }
  });

  app.get('/customers/:id/payment-intents', async (req, res) => {
    //
    // '/payment-intents' can be in a separate root handler with 'customerId' in query params (req.query.customerId)
    //
    try {
      const customerId = req.params.id;
      if (!customerId) throw new Error('customerId is empty');

      const customer = customers.find((item) => item.id === customerId);
      if (!customer) throw new Error('customer is not found');

      // https://stripe.com/docs/api/payment_intents/list
      const paymentIntents = await stripe.paymentIntents.list({
        customer: customer.stripeId,
      });

      // The same approach is not supported for 'sessions.list'
      // const sessions = await stripe.checkout.sessions.list({
      //   customer: customer.stripeId, // Error: "Received unknown parameter: customer"
      // });

      const result = paymentIntents.data.map(({ id, amount, created, currency, status }) => ({
        id,
        amount: amount / 100,
        created,
        currency,
        status,
      }));
      res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });

  app.get('/customers/:id/purchased-products', async (req, res) => {
    //
    // The 'purchased-products' value is required to determine available resources on the site
    // and it can be stored in a site localDB to get it in a short time without network roundtrips/memory/calculations
    //
    try {
      const customerId = req.params.id;
      if (!customerId) throw new Error('customerId is empty');

      const customer = customers.find((item) => item.id === customerId);
      if (!customer) throw new Error('customer is not found');

      const result = purchases
        .filter((item) => item.customerId === customerId)
        .map((item) => {
          return { product: products.find((product) => product.id === item.productId) };
        });

      res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
};
