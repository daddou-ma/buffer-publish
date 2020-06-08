import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Button } from '@bufferapp/ui';
import { ButtonWrapper, InputWrapper, StyledButton } from './styles';

class CreditCardForm extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = ev => {
    ev.preventDefault();

    const {
      cycle,
      handleCardSetupRequest,
      plan,
      setupIntentClientSecret,
      source,
      stripe,
      upgradePlan,
    } = this.props;

    // TODO - merge in one?
    handleCardSetupRequest(
      stripe,
      setupIntentClientSecret,
      source,
      plan,
      cycle
    );
    if (typeof upgradePlan === 'function') {
      upgradePlan();
    }
  };

  render() {
    const {
      buttonLabel,
      validating,
      closeButtonLabel,
      closeAction,
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
          <StyledButton
            type="primary"
            onClick={this.handleSubmit}
            label={buttonLabel}
            disabled={validating}
          />
        </ButtonWrapper>
      </form>
    );
  }
}

export default injectStripe(CreditCardForm);
