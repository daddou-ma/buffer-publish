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
    return (
      <StripeProvider apiKey={window.STRIPE_PUBLISHABLE_KEY}>
        <Elements>
          <CreditCardForm {...this.props} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default StripeWrapper;
