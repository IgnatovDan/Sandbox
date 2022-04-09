import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { withRouter } from "react-router-dom";

const Card = () => {
    const elements = useElements();
    const stripe = useStripe();

    const handleSubmit = async (e) => {
        console.log('> handleSubmit');
        // DOM event handlers are not 'async'
        e.preventDefault();
        if (!elements || !stripe) {
            console.log('< handleSubmit: no stripe or elements');
            return;
        }

        console.log('Creating payment intent...');
        const { error: serverError, clientSecret } = await fetch(
            '/create-payment-intent',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodType: "card", currency: "usd" })
            }
        ).then(r => r.json());
        if (serverError) {
            console.log('Server error occurs: ' + serverError.message);
            return;
        }
        console.log('payment Intent is created, clientSecret: ' + clientSecret);

        console.log('Confirming payment intent...');
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }
        );

        if (confirmError) {
            console.log('Confirm error occurs: ' + confirmError.message);
            return;
        }

        console.log('payment Intent is confirmed: ' + paymentIntent.id + ' - ' + paymentIntent.status);

        console.log('< handleSubmit');
    };


    // https://stripe.com/docs/testing?numbers-or-method-or-token=card-numbers#visa
    // 4242424242424242	+ CSV: Any 3 digits + Date: Any future date + Index: Any 5 digits
    return (
        <>
            <h1>Card</h1>
            <form id="payment-form" onSubmit={ handleSubmit }>
                <label htmlFor="card-element"></label>
                <CardElement />
                <button>Pay</button>
            </form>
        </>
    );
}

export default withRouter(Card);
