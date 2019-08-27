import { connect } from 'react-redux';
import { actions as stripeActions } from '@bufferapp/stripe';

import StripeCreditCardForm from './components/CreditCardForm';

export default connect(
  null,
  dispatch => ({
    getSetupIntent: () => dispatch(stripeActions.getSetupIntent()),
  }),
)(StripeCreditCardForm);
