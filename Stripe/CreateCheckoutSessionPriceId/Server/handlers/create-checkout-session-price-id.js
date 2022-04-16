const { prices, customers } = require('../ensureStripeObjects');

module.exports = function (app, stripe) {
  app.post('/create-checkout-session-price-id', async (req, res) => {
    console.log('> create-checkout-session');
    console.log(req.body);

    try {
      const { productId, customerId, successUrl, cancelUrl } = req.body;
      if (!productId) throw new Error('productId is empty');
      if (!customerId) throw new Error('customerId is empty');

      const defaultPrice = prices.find((item) => item.isDefault && item.productId === productId);
      if (!defaultPrice) throw new Error('defaultPrice is not found');

      const customer = customers.find((item) => item.id === customerId);
      if (!customer) throw new Error('customer is not found');

      const session = await stripe.checkout.sessions.create({
        customer: customer.stripeId,
        line_items: [{ price: defaultPrice.stripeId, quantity: 1 }],
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: successUrl && `http://localhost:3000/${successUrl}?session_id={CHECKOUT_SESSION_ID}`, // use process.env to specify both the production and development values
        cancel_url: cancelUrl && `http://localhost:3000/${cancelUrl}?session_id={CHECKOUT_SESSION_ID}`,
      });

      console.log('session.url: ' + session.url);
      res.json({ url: session.url });
    } catch (e) {
      console.log('catch(e)');
      console.log(e);
      res.status(500).json({ error: e.message });
    }

    console.log('< create-checkout-session');
  });
};
