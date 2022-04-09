curl -X POST http://localhost:4242/create-payment-intent -H "Content-Type: application/json" -d "{\"paymentMethodType\": \"au_becs_debit\", \"currency\":\"usd\"}"
