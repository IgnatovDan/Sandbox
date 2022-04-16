export default async function getProduct(id) {
  return await fetch(`http://localhost:3001/products/${id}`).then((res) => res.json());
}
