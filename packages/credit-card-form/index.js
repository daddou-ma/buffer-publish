import { connect } from 'react-redux';
import { actions as stripeActions } from '@bufferapp/stripe';

import StripeCreditCardForm from './components/CreditCardForm';

export default connect(
  state => ({
    stripePublishableKey: state.creditCardForm.stripePublishableKey,
  }),
  dispatch => ({
    createSetupIntentRequest: () =>
      dispatch(stripeActions.createSetupIntentRequest()),
  })
)(StripeCreditCardForm);

export reducer from './reducer';
