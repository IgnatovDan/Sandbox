import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getCustomer from '../remoteQueries/getCustomer';
import ButtonSetAsCurrentCustomer from './ButtonSetAsCurrentCustomer';

export default function Customer() {
  const { id } = useParams();
  const [obj, setObj] = useState(null);

  useEffect(() => {
    getCustomer(id).then((customer) => setObj(customer));
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
