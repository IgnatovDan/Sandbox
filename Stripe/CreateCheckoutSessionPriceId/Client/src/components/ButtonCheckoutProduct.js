import { useContext, useEffect, useState } from "react";
import CurrentCustomerIdContext from "../contexts/CurrentCustomerIdContext";

function useProductPrice(productId, setError) {
  const [price, setPrice] = useState();

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/productDefaultPrice/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            console.log('response.ok is false');
            console.log(res);
            return res.json().then((json) => Promise.reject(json));
          }
          return res.json();
        })
        .then((json) => {
          console.log('then((json)');
          console.log(json);
          setError(undefined);
          setPrice(json);
        })
        .catch((e) => {
          console.log('catch(e)');
          console.log(e);
          setError(e);
          setPrice(undefined);
        });
    } catch (e) {
      console.log('catch (e)');
      console.log(e);
      setError(e);
      setPrice(undefined);
    }
  }, []);

  return price;
}

async function startCheckoutThroughStripeUrl(customerId, productId) {
  try {
    const result = await fetch(
      // TODO: async method, show 'Waiting...'
      'http://localhost:3001/create-checkout-session-price-id',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          customerId,
          productId,
          successUrl: 'payment_success.html',
          cancelUrl: 'payment_cancel.html',
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          console.log('response.ok is false');
          console.log(res);
          throw { error: e.statusText };
          //return res.json().then((json) => Promise.reject(json));
        }
        console.log('response.ok is true');
        return res.json();
      })
      .then((json) => {
        console.log('json');
        console.log(json);
        return {
          url: json.url,
        };
      })
      .catch((e) => {
        console.log('.catch');
        console.log(e);
        return {
          error: e.statusText,
        };
      });
    return result;
  } catch (e) {
    console.log('catch (e)');
    console.log(e);
    return {
      error: e.message,
    };
  }
}

export default function ButtonCheckoutProduct({ productId }) {
  const { customerId } = useContext(CurrentCustomerIdContext);
  const [error, setError] = useState();
  const price = useProductPrice(productId, setError);
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  const handleCheckoutClick = async (e) => {
    e.preventDefault();
    setCheckoutInProgress(true);
    try {
      const { url, error } = await startCheckoutThroughStripeUrl(customerId, productId);
      if (error) {
        setError(error);
      } else if (url) {
        window.location = url;
      } else {
        throw { message: 'Internal error' };
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setCheckoutInProgress(false);
    }
  };

  const priceText = (error && JSON.stringify(error)) || (price && `${price.cost} ${price.currency}`);

  return (
    <>
      <button disabled={checkoutInProgress} onClick={handleCheckoutClick}>
        {checkoutInProgress ? 'Starting checkout...' : `Checkout (${priceText || 'Loading...'})`}
      </button>
    </>
  );
}
