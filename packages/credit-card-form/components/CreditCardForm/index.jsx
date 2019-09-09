import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PropTypes from 'prop-types';

import CreditCardForm from './form';

class StripeWrapper extends Component {
  static propTypes = {
    createSetupIntentRequest: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { createSetupIntentRequest } = this.props;
    createSetupIntentRequest();
  }

  render() {
    const { stripePublishableKey, stripe } = this.props;

    return (
      <StripeProvider stripe={stripe}>
        <Elements>
          <CreditCardForm {...this.props} />
        </Elements>
      </StripeProvider>
    );
  }
}

StripeWrapper.propTypes = {
  stripe: PropTypes.any, // eslint-disable-line
  stripePublishableKey: PropTypes.string,
  createSetupIntentRequest: PropTypes.func,
  buttonLabel: PropTypes.string,
  closeButtonLabel: PropTypes.string,
  closeAction: PropTypes.func,
  validating: PropTypes.bool,
};

export default StripeWrapper;
