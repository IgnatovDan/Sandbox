import { useContext, useEffect, useState } from "react";
import CurrentCustomerIdContext from "../contexts/CurrentCustomerIdContext";

export default function ButtonCheckoutProduct({ productId }) {
  const { customerId } = useContext(CurrentCustomerIdContext);
  const [price, setPrice] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    try {
      fetch(
        `http://localhost:3001/productDefaultPrice/${productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      ).then(res => {
        if (!res.ok) {
          console.log('response.ok is false');
          console.log(res);
          return res.json().then(json => Promise.reject(json));
        }
        return res.json();
      }).then((json) => {
        console.log(json);
        setError(undefined);
        setPrice(json);
      }).catch(e => {
        console.log('catch(e)');
        console.log(e);
        setError(e);
        setPrice(undefined);
      });
    } catch (e) {
      setError(e);
      setPrice(undefined);
    }
  }, []);


  return <>
    <button>Checkout (
      { price ? `${price.cost} ${price.currency}` : 'Loading...' }
      { error && JSON.stringify(error) }
      )</button>
  </>;
}
