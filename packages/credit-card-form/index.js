import { connect } from 'react-redux';
import { actions as stripeActions } from '@bufferapp/stripe';

import StripeCreditCardForm from './components/CreditCardForm';

export default connect(
  null,
  dispatch => ({
    createSetupIntentRequest: () => dispatch(stripeActions.createSetupIntentRequest()),
  }),
)(StripeCreditCardForm);
