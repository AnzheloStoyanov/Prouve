import {
    AddressElement,
    CardElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
  import axios from "axios";
  import { useState } from "react";
  
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#87bbfd" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  
  export default function PaymentForm(amount) {
    const [success, setSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
  
      if (!error) {
        try {
          const { id } = paymentMethod;
          const productID = "price_1OLNLKHGku6BOIoRNaZbfKHl"; // Replace with your actual product ID
  
          // Directly pass payment and product details to the server
          const response = await axios.post("https://woof-and-roof.onrender.com/payment", {
            amount:'1500',
            id,
            description: "Кучешка колиба 2",
            userEmail, // Use the dynamically set email
            productID,
          });
  
          if (response.data.success) {
            console.log("Successful payment");
            setSuccess(true);
          }
        } catch (error) {
          console.log("Error", error);
        }
      } else {
        console.log(error.message);
      }
    };
  
    return (
      <div>
        {!success ? (
          <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <AddressElement options={{ mode: "billing" }}></AddressElement>
              </div>
            </fieldset>
            <button>Pay</button>
          </form>
        ) : (
          <div>
            <h2>
              You just bought a sweet spatula congrats this is the best decision
              of you're life
            </h2>
          </div>
        )}
      </div>
    );
  }
  