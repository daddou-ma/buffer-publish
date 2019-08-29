/* eslint-disable arrow-parens */
import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Button } from '@bufferapp/ui';

class CreditCardForm extends Component {
  handleSubmit = ev => {
    ev.preventDefault();

    const { stripeClientSecret, hideModal, stripe } = this.props;
    stripe
      .handleCardSetup(stripeClientSecret)
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
        <Button type="primary" label="Select Plan" />
      </form>
    );
  }
}

export default injectStripe(CreditCardForm);
