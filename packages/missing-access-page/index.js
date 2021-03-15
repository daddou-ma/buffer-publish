import { connect } from 'react-redux';
import { organization } from '@bufferapp/publish-routes';

import MissingAccessPage from './components/MissingAccessPage';

export default connect(
  state => {
    const { isAdmin, ownerEmail, name } = state.organizations.selected || {};
    return {
      orgName: name,
      ownerEmail,
      isAdmin,
    };
  },
  dispatch => ({
    switchOrganization(orgId) {
      dispatch(organization.goTo({ orgId }));
    },
  })
)(MissingAccessPage);
