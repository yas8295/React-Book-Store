import React, { useContext, useState } from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
import { contexts } from "../DarkButton/DarkButton";
import { ClipLoader } from "react-spinners";

const stripePromise = () => {
  try {
    const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    return stripe;
  } catch (error) {
    console.log(error);
  }
};

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  const { dark } = useContext(contexts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      console.log("[error]", error);
    } else {
      setError(false);
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "International",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242424242424242",
            expiry_month: "02",
            expiry_year: "24",
            cvc: "123",
            postal_zip_code: "94107",
          },
        },
      };


      onCaptureCheckout(checkoutToken.id, orderData);

      nextStep();
    }
    setLoading(false);
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements
        stripe={stripePromise()}
        options={{ appearance: { theme: "flat" } }}
      >
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form
              onSubmit={(e) => handleSubmit(e, elements, stripe)}
              className="text-[white!important]"
            >
              <CardElement
                options={{
                  classes: { focus: "dark:text-[white!important]" },
                  style: {
                    base: {
                      color: `${dark ? "white" : "black"}`,
                      "::placeholder": {
                        color: `${dark ? "#d4d4d4" : "#303030"}`,
                      },
                      iconColor: `${dark ? "#d4d4d4" : "#303030"}`,
                    },
                  },
                }}
              />
              {error && (
                <h1 className="mt-3 text-red-600 font-semibold">⛔ {error}</h1>
              )}
              <h1 className="mt-3 opacity-70 text-black dark:text-[white!important]">
                Test card: 4242424242424242
              </h1>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  className="dark:text-white"
                  style={{ border: "1px solid #4ea4cd" }}
                  variant="outlined"
                  onClick={backStep}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  className="bg-[#001524!important] text-white dark:bg-[#3f51b5!important]"
                >
                  {loading ? (
                    <ClipLoader color="white" loading size={25} />
                  ) : (
                    `Pay ${checkoutToken.subtotal.formatted_with_symbol}`
                  )}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
