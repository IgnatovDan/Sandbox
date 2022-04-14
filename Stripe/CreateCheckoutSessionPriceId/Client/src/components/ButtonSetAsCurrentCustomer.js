import { useContext } from 'react';
import CurrentCustomerIdContext from '../contexts/CurrentCustomerIdContext';

export default function ButtonSetAsCurrentCustomer(props) {
  const { setCustomerId } = useContext(CurrentCustomerIdContext);
  const changeCurrentCustomer = (e) => {
    e.preventDefault();
    setCustomerId(props.customerId);
  };

  return <button onClick={ changeCurrentCustomer }>Set { props.customerId } as current customer</button>;
}
