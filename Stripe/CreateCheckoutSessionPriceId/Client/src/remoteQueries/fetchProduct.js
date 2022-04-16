export async function fetchProduct(id) {
  return await fetch(`http://localhost:3001/products/${id}`).then((res) => res.json());
}
