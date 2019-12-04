import { connect } from 'react-redux';
import { actions } from './reducer';

import DefaultPage from './components/DefaultPage';

export default connect(
  state => ({
    translations: state.i18n.translations['default-page'],
  }),
  dispatch => ({
    onConnectSocialAccountClick: () => {
      dispatch(actions.handleConnectSocialAccountClick());
    },
  })
)(DefaultPage);

export { actions, actionTypes } from './reducer';
export middleware from './middleware';
