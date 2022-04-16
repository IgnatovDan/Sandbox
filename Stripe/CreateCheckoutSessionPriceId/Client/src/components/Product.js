import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../remoteQueries/fetchProduct';
import ButtonCheckoutProduct from './ButtonCheckoutProduct';

export default function Product() {
  const { id } = useParams();
  const [obj, setObj] = useState(null);

  useEffect(() => {
    fetchProduct(id).then((item) => setObj(item));
  }, []);

  return (
    <>
      <div>id: {id}</div>
      <div>JSON: {obj ? JSON.stringify(obj) : 'Loading...'}</div>
      <ButtonCheckoutProduct productId={id} />
    </>
  );
}
