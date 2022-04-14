import { useContext } from 'react';
import CurrentCustomerContext from '../contexts/CurrentCustomerContext';

export default function ButtonSetAsCurrentCustomer(props) {
  const { setCustomer } = useContext(CurrentCustomerContext);
  const changeCurrentCustomer = (e) => {
    e.preventDefault();
    setCustomer(props.customerId);
  };

  return <button onClick={changeCurrentCustomer}>TODO: set {props.customerId} as current customer</button>;
}
