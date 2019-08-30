/* eslint-disable arrow-parens */
import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from '@bufferapp/ui';
import { ButtonWrapper } from './styles';

class CreditCardForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault();

    const { setupIntentClientSecret, hideModal, stripe } = this.props;
    stripe
      .handleCardSetup(setupIntentClientSecret)
      .then(res => {
        // handle upgrade
      })
      .catch(err => {
        // handle error
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <ButtonWrapper>
          <Button type="secondary" label={closeButtonLabel} onClick={closeAction} />
          <Button type="primary" label={buttonLabel} disabled={validating} />
        </ButtonWrapper>
      </form>
    );
  }
}

export default injectStripe(CreditCardForm);
