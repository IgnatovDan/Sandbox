const productsPath = 'products';
const idPath = ':id';
const customersPath = 'customers';

export default {
  productsPath,
  customersPath,
  idPath,
  getProductPath: (id) => `/${productsPath}/${id}`,
  getCustomerPath: (id) => `/${customersPath}/${id}`,
};
