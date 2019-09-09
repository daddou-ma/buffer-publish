import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from "@bufferapp/ui";
import { ButtonWrapper, InputWrapper } from "./styles";

class CreditCardForm extends Component {
  handleSubmit = (ev) => {
    ev.preventDefault();

    const {
      cycle,
      handleCardSetupRequest,
      handleCardSetupSuccess,
      handleCardSetupError,
      plan,
      setupIntentClientSecret,
      source,
      stripe,
      upgradePlan,
    } = this.props;

    handleCardSetupRequest();

    stripe
      .handleCardSetup(setupIntentClientSecret)
      .then((res) => {
        const options = {
          paymentMethodId: res.setupIntent.payment_method,
          source,
          plan,
          cycle,
        }
        handleCardSetupSuccess(options);
        upgradePlan();
      })
      .catch((err) => {
        handleCardSetupError(err);
      });
  };

  render() {
    const {
      buttonLabel,
      validating,
      closeButtonLabel,
      closeAction
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <InputWrapper>
          <CardElement />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            type="secondary"
            label={closeButtonLabel}
            onClick={closeAction}
          />
          <Button type="primary" label={buttonLabel} disabled={validating} />
        </ButtonWrapper>
      </form>
    );
  }
}

export default injectStripe(CreditCardForm);
