import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getCheckoutSessions from '../remoteQueries/getCheckoutSessions';
import getCustomer from '../remoteQueries/getCustomer';
import getCustomerPaymentIntents from '../remoteQueries/getCustomerPaymentIntents';
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
    getCustomer(id).then((customer) => setObj(customer));
  }, []);

  useEffect(() => {
    getCustomerPaymentIntents(id).then((items) => setPaymentIntents(items));
  }, []);

  useEffect(() => {
    getCheckoutSessions({ customerId: id }).then((items) => setCheckoutSessions(items));
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
