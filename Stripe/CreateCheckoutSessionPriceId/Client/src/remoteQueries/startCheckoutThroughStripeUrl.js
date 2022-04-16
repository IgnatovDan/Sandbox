export default async function startCheckoutThroughStripeUrl(customerId, productId) {
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
          throw { error: res.statusText };
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
