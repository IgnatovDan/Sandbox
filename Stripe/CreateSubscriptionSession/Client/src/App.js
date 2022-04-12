import './App.css';

function App() {

  const makeCheckout = (e) => {
    e.preventDefault();

    fetch( // TODO: async method, show 'Waiting...'
      //'http://localhost:3001/create-checkout-session',
      '/create-checkout-session-price-in-query', // "proxy": "http://localhost:3001", in package.json allows to remove 'http://localhost'
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          product_1: { quantity: 3 },
          product_2: { quantity: 5 }
        })
      }
    ).then(res => {
      if (!res.ok) {
        console.log('response.ok is false');
        console.log(res);
        return res.json().then(json => Promise.reject(json));
      }
      console.log('response.ok is true');
      return res.json();
    }).then((json) => {
      console.log('json');
      console.log(json);
      window.location = json.url;
    }).catch(e => {
      // TODO: show in UI
      console.log('catch(e)');
      console.log(e);
    });
  };

  return (
    <div className="App">
      <p>
        Edit src/App.js and save to reload.
      </p>
      <button onClick={ makeCheckout }>Checkout</button>
    </div>
  );
}

export default App;
