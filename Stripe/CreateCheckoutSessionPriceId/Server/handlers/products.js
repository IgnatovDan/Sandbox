const { products } = require('../ensureStripeObjects');

module.exports = function (app) {
  app.get('/products', async (req, res) => {
    res.json(products);
  });

  app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = products.find((item) => item.id === id);
    if (!product) {
      res.status(404).json({ message: `${id} item was not found` });
    } else {
      res.json(product);
    }
  });
};
