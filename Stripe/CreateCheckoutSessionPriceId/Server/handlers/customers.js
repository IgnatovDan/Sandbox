const { customers } = require('../ensureStripeObjects');

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
    // '/payment-intents' should be in a separate root handler with 'customerId' in query params (req.query.customerId)
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
};

const o = {
  object: 'list',
  data: [
    {
      id: 'pi_3Kow4ZECzsV9i2SN1AfoAf3U',
      object: 'payment_intent',
      amount: 20001,
      amount_capturable: 0,
      amount_details: { tip: { amount: null } },
      amount_received: 0,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'automatic',
      charges: {
        object: 'list',
        data: [],
        has_more: false,
        total_count: 0,
        url: '/v1/charges?payment_intent=pi_3Kow4ZECzsV9i2SN1AfoAf3U',
      },
      client_secret: 'pi_3Kow4ZECzsV9i2SN1AfoAf3U_secret_pnSizuLFiRlCKvyyOKVdTdSf7',
      confirmation_method: 'automatic',
      created: 1650055735,
      currency: 'usd',
      customer: 'cus_LVxSB6yPKWD7Je',
      description: null,
      invoice: null,
      last_payment_error: null,
      livemode: false,
      metadata: {},
      next_action: null,
      on_behalf_of: null,
      payment_method: null,
      payment_method_options: {
        card: { installments: null, mandate_options: null, network: null, request_three_d_secure: 'automatic' },
      },
      payment_method_types: ['card'],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'requires_payment_method',
      transfer_data: null,
      transfer_group: null,
    },
  ],
  has_more: false,
  url: '/v1/payment_intents',
};
