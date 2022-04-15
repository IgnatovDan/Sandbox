import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ButtonSetAsCurrentCustomer from './ButtonSetAsCurrentCustomer';

export default function Customer() {
  const { id } = useParams();
  const [obj, setObj] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/customers/${id}`)
      .then((res) => res.json())
      .then((item) => setObj(item));
  }, []);

  return (
    <>
      <div>id: {id}</div>
      <div>JSON: {obj ? JSON.stringify(obj) : 'Loading...'}</div>
      <ButtonSetAsCurrentCustomer customerId={id} />
      Payments: TODO load from my server (stripe database is the source of truth, no replications, no copies)
    </>
  );
}
