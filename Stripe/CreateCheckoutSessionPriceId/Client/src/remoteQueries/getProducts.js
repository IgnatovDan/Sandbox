export default async function getProducts() {
  return await fetch(`http://localhost:3001/products`).then((res) => res.json());
}
