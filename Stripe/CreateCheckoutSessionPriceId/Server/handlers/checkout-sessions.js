const { customers } = require('../ensureStripeObjects');

module.exports = function (app, stripe) {
  app.get('/checkout-sessions', async (req, res) => {
    try {
      // https://stripe.com/docs/api/payment_intents/list
      // "customer: customer.stripeId" is not supported, "Received unknown parameter: customer" is returned
      // It is a time/memory/traffic/CPU consiming operations if there is a lot of entries
      const stripeResult = await stripe.checkout.sessions.list();

      const sessions = stripeResult.data.map(({ id, amount_total, currency, customer, payment_status, status }) => ({
        id,
        amountTotal: amount_total / 100,
        currency,
        customer,
        paymentStatus: payment_status,
        status,
      }));

      let result;
      if (req.query.customerId) {
        //
        // Non sequre API: 'req.query.customerId' allows to get all session for other clients
        //
        // It is a time/memory/traffic/CPU consiming operations if there is a lot of entries
        // Use stripe API to filter there records on the stripe servers
        const customer = customers.find((item) => (item.id = req.query.customerId));

        if (!customer) throw new Error(`${req.query.customerId} is not found`);
        result = sessions.filter((item) => item.customer === customer.stripeId);
      } else {
        //
        // Non sequre API: it allows to get all session for all clients at once
        //
        result = sessions;
      }

      res.json(result);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
};
