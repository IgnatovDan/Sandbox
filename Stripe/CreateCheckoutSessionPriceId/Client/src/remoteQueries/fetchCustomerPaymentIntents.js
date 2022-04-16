export async function fetchCustomerPaymentIntents(id) {
  if (!id) throw new Error('id is empty');
  return await fetch(`http://localhost:3001/customers/${id}/payment-intents`).then((res) => res.json());
}
