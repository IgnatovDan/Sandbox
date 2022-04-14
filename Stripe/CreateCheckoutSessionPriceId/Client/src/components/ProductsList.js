import { useEffect, useState } from 'react';

export default function ProductsList() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {JSON.stringify(item)}
          <button>TODO: checkout product</button>
        </li>
      ))}
    </ul>
  );
}
