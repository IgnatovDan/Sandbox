import { useContext, useEffect, useState } from "react";
import CurrentCustomerIdContext from "../contexts/CurrentCustomerIdContext";
import { fetchProductDefaultPrice } from '../remoteQueries/fetchProductDefaultPrice';
import startCheckoutThroughStripeUrl from '../remoteQueries/startCheckoutThroughStripeUrl';

export default function ButtonCheckoutProduct({ productId }) {
  const { customerId } = useContext(CurrentCustomerIdContext);
  const [error, setError] = useState();
  const [price, setPrice] = useState();
  const [checkoutInProgress, setCheckoutInProgress] = useState(false);

  useEffect(() => {
    fetchProductDefaultPrice(productId).then(({ error, price }) => {
      setError(error);
      setPrice(price);
    });
  }, []);

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

  const priceText = (error && JSON.stringify(error)) || (price && `${price.cost} ${price.currency}`) || 'Loading...';

  return (
    <>
      <button disabled={checkoutInProgress} onClick={handleCheckoutClick}>
        {checkoutInProgress ? 'Starting checkout...' : `Checkout (${priceText})`}
      </button>
    </>
  );
}
