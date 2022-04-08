import React from 'react'
import ReactDOM from 'react-dom'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import { BrowserRouter, Route } from 'react-router-dom'
import Card from './components/card'

(async () => {
  const { publishableKey } = await fetch('/config').then(r => r.json())
  const stripePromise = loadStripe(publishableKey);

  ReactDOM.render(
    <React.StrictMode>

      <Elements stripe={ stripePromise }>
        <BrowserRouter>
          <Route path="/" exact>
            <h1>HELLO!</h1>
          </Route>
          <Route path="/Card">

            <Card></Card>

          </Route>
        </BrowserRouter>
      </Elements>

    </React.StrictMode>,
    document.getElementById('root')
  );

})()
