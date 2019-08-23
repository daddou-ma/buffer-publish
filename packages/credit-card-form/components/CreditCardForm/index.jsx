import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";

import CreditCardForm from "./form";

const StripeWrapper = props => (
  <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
    <Elements>
      <CreditCardForm {...props} />
    </Elements>
  </StripeProvider>
);

export default StripeWrapper;
