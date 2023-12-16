
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51N02adHGku6BOIoR9Zz3t5ksSBkwHfxs6518gm3HyYQEB3xnC2oGwvV9qKP5RgUfR8m28zeTv1RuImpoSMw9Lxxq00kjwGJX14"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(amount) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm amount={amount} />
		</Elements>
	)
}
