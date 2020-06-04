import { connect } from 'react-redux';
import { actions } from './reducer';

import DefaultPage from './components/DefaultPage';

export default connect(
  state => ({
    orgName: state.organizations.selected.name,
    ownerEmail: state.organizations.selected.ownerEmail,
    isAdmin:
      state.user.features?.includes('org_switcher') &&
      state.organizations.selected.isAdmin,
  }),
  dispatch => ({
    onConnectSocialAccountClick: () => {
      dispatch(actions.handleConnectSocialAccountClick());
    },
  })
)(DefaultPage);

export { actions, actionTypes } from './reducer';
export middleware from './middleware';
