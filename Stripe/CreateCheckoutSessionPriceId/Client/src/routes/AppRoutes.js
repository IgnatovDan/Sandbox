const productsPath = 'products';
const customersPath = 'customers';

export default {
  productsPath,
  customersPath,
  getProductPath: (id) => `/${productsPath}/${id}`,
  getCustomerPath: (id) => `/${customersPath}/${id}`,
};
