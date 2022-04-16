export async function fetchPurchasedProducts({ customerId }) {
  return await fetch(`http://localhost:3001/customers/${customerId}/purchased-products`).then((res) => res.json());
}
