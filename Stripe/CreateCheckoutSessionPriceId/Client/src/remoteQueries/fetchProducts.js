export async function fetchProducts() {
  return await fetch(`http://localhost:3001/products`).then((res) => res.json());
}
