export async function fetchCheckoutSessions({ customerId }) {
  const params = customerId ? `?customerId=${customerId}` : '';
  return await fetch(`http://localhost:3001/checkout-sessions${params}`).then((res) => res.json());
}
