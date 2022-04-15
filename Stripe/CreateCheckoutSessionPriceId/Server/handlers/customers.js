const { customers } = require('../ensureStripeObjects');

module.exports = function (app, stripe) {
  app.get('/customers', async (req, res) => {
    res.json(customers);
  });

  app.get('/customers/:id', async (req, res) => {
    const id = req.params.id;
    const customer = customers.find((item) => item.id === id);
    if (!customer) {
      res.status(404).json({ message: `${id} item was not found` });
    } else {
      res.json(customer);
    }
  });

  app.get('/customers/:id/payment-intents', async (req, res) => {
    try {
      const customerId = req.params.id;
      if (!customerId) throw new Error('customerId is empty');

      const customer = customers.find((item) => item.id === customerId);
      if (!customer) throw new Error('customer is not found');
      console.log(customer.stripeId);

      const paymentIntents = await stripe.paymentIntents.list({
        //        customer: customer.stripeId,
      });

      res.json(paymentIntents.data);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
};
