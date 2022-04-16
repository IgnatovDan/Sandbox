export default async function getProductDefaultPrice(productId) {
  try {
    const result = await fetch(`http://localhost:3001/productDefaultPrice/${productId}`, {
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
        return { price: json };
      })
      .catch((e) => {
        console.log('catch(e)');
        console.log(e);
        return { error: e };
      });

    return result;
  } catch (e) {
    console.log('catch (e)');
    console.log(e);
    return { error: e };
  }
}
