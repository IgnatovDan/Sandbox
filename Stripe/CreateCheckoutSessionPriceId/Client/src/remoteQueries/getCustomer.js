export default async function getCustomer(id) {
  return await fetch(`http://localhost:3001/customers/${id}`).then((res) => res.json());
}
