const { products, prices } = require('../ensureStripeObjects');

module.exports = function (app, stripe) {
  app.get('/productDefaultPrice/:id', async (req, res) => {
    //
    // Instead, store a priceStripeId in a product object in localDB
    // Query to stripe seems to be too long
    //

    try {
      const productId = req.params.id;
      const product = products.find((item) => item.id === productId);
      if (!product) {
        res.status(404).json({ message: `Product ${productId} was not found` });
      }

      // Introduce intermediate cache to improve performance (renew cache using webhook)
      // Instead, use stripe.prices.search({ query: `metadata:"default:true"` }); ???
      const prices = await stripe.prices.list({
        product: product.stripeId,
        active: true,
      });

      const price = prices.data.find((item) => item.metadata?.default);
      if (!price) {
        res.status(404).json({ message: `Default price for ${id} product was not found` });
      } else {
        res.json({ cost: price.unit_amount / 100, currency: price.currency });
      }
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  });
};
