import { connect } from 'react-redux';
import DisabledQueue from './components/DisabledQueue';
import { actions } from './reducer';

export default connect(
  state => ({
    translations: state.i18n.translations['disabled-queue'],
  }),
  dispatch => ({
    onManageSocialAccountClick: () => {
      dispatch(actions.handleManageSocialAccountClick());
    },
    goToConnectSocialAccount: () => {
      dispatch(actions.handleConnectSocialAccount());
    },
  }),
)(DisabledQueue);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
