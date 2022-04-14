import { useState, useEffect } from 'react';

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  // TODO: const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then((res) => res.json())
      .then((items) => setCustomers(items));
  }, []);

  return (
    <ul>
      { customers.map((item) => (
        <li key={ item.id }>
          { JSON.stringify(item) }
          <button>TODO: set as current customer</button>
        </li>
      )) }
    </ul>
  );
}
