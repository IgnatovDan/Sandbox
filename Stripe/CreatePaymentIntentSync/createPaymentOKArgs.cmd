curl -X POST http://localhost:1234/create-payment-intent -H "Content-Type: application/json" -d "{ \"paymentMethodType\": \"card\", \"currency\":\"usd\" }"
