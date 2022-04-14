import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import ButtonSetAsCurrentCustomer from './ButtonSetAsCurrentCustomer';

export default function CustomersList() {
  const [customers, setCustomers] = useState([]);
  // TODO: const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/customers')
      .then((res) => res.json())
      .then((items) => setCustomers(items));
  }, []);

  return (
    <>
      <ul>
        {customers.map((item) => (
          <li key={item.id}>
            <Link key={item.id} to={AppRoutes.getCustomerPath(item.id)}>
              {JSON.stringify(item)}
            </Link>
            <ButtonSetAsCurrentCustomer customerId={item.id} />
          </li>
        ))}
      </ul>
    </>
  );
}
