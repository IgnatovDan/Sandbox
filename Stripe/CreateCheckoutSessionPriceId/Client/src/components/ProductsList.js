import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getProducts from '../remoteQueries/getProducts';
import AppRoutes from '../routes/AppRoutes';
import ButtonCheckoutProduct from './ButtonCheckoutProduct';

export default function ProductsList() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getProducts().then((items) => setItems(items));
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link key={item.id} to={AppRoutes.getProductPath(item.id)}>
            {JSON.stringify(item)}
          </Link>
          <ButtonCheckoutProduct productId={item.id} />
        </li>
      ))}
    </ul>
  );
}
