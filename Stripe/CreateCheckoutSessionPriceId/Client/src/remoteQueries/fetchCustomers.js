export async function fetchCustomers() {
  return await fetch(`http://localhost:3001/customers`).then((res) => res.json());
}
