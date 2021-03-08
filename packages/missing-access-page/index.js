import { connect } from 'react-redux';
import { organization } from '@bufferapp/publish-routes';
import { getAccessType } from './utils';

import MissingAccessPage from './components/MissingAccessPage';

export default connect(
  state => {
    const isAdmin = state.organizations?.selected?.isAdmin;
    return {
      orgName: state.organizations.selected?.name,
      ownerEmail: state.organizations.selected?.ownerEmail,
      isAdmin,
    };
  },
  dispatch => ({
    switchOrganization(orgId) {
      dispatch(organization.goTo({ orgId }));
    },
  })
)(MissingAccessPage);
