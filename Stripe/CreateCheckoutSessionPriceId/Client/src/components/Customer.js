import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCheckoutSessions } from '../remoteQueries/fetchCheckoutSessions';
import { fetchCustomer } from '../remoteQueries/fetchCustomer';
import { fetchCustomerPaymentIntents } from '../remoteQueries/fetchCustomerPaymentIntents';
import ButtonSetAsCurrentCustomer from './ButtonSetAsCurrentCustomer';

export default function Customer() {
  const { id } = useParams();
  const [obj, setObj] = useState(null);
  const [paymentIntents, setPaymentIntents] = useState(null);
  const [checkoutSessions, setCheckoutSessions] = useState(null);

  if (!id) {
    return <>CustomerId is empty</>;
  }

  useEffect(() => {
    fetchCustomer(id).then((customer) => setObj(customer));
  }, []);

  useEffect(() => {
    fetchCustomerPaymentIntents(id).then((items) => setPaymentIntents(items));
  }, []);

  useEffect(() => {
    fetchCheckoutSessions({ customerId: id }).then((items) => setCheckoutSessions(items));
  }, []);

  return (
    <>
      <h4>id: {id}</h4>
      <div>JSON: {obj ? JSON.stringify(obj) : 'Loading...'}</div>
      <ButtonSetAsCurrentCustomer customerId={id} />
      <h4>Payment Intents:</h4>
      {!paymentIntents && 'Loading...'}
      {paymentIntents && paymentIntents.map((item) => <div key={item.id}>{JSON.stringify(item)}</div>)}
      <h4>Checkout Sessions:</h4>
      {!checkoutSessions && 'Loading...'}
      {checkoutSessions && checkoutSessions.map((item) => <div key={item.id}>{JSON.stringify(item)}</div>)}
    </>
  );
}
