import { useState, useEffect } from 'react';

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then(res => res.json())
      .then(items => setCustomers(items));
  }, []);

  return (
    <ul>
      { customers.map(item => <li key={ item.id }>{ item.name }</li>) }
      <button>set as current customer</button>
    </ul>
  );
}
