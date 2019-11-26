import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { LoadingAnimation } from '@bufferapp/components';
import styled from 'styled-components';

import CreditCardForm from './form';

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class StripeWrapper extends Component {
  static propTypes = {
    createSetupIntentRequest: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { stripe: null };
  }

  componentDidMount() {
    const { stripePublishableKey } = this.props;

    if (
      typeof window !== 'undefined' &&
      typeof window.Stripe !== 'undefined' &&
      window.Stripe
    ) {
      this.setState({ stripe: window.Stripe(stripePublishableKey) });
    } else {
      const stripeJS = document.querySelector('#stripe-js');
      if (stripeJS !== null) {
        stripeJS.addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          this.setState({ stripe: window.Stripe(stripePublishableKey) });
        });
      }
    }
    const { createSetupIntentRequest } = this.props;
    createSetupIntentRequest();
  }

  render() {
    const { stripe } = this.state;

    if (!stripe) {
      return (
        <LoaderWrapper>
          <LoadingAnimation marginTop={0} />
        </LoaderWrapper>
      );
    }

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
