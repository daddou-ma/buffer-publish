import { connect } from 'react-redux';
import { organization } from '@bufferapp/publish-routes';
import { getAccessType } from './utils';

import MissingAccessPage from './components/MissingAccessPage';

export default connect(
  state => {
    const isAdmin = state.organizations.selected?.role === 'admin';
    const orgWithAccess = state.appShell.organizations?.find(
      org => org.billing.canAccessPublishing
    );
    return {
      orgName: state.organizations.selected?.name,
      orgNameWithAccess: orgWithAccess?.name,
      orgIdWithAccess: orgWithAccess?.id,
      ownerEmail: state.organizations.selected?.ownerEmail,
      accessType: getAccessType({ isAdmin, hasOrgWithAccess: orgWithAccess }),
    };
  },
  dispatch => ({
    switchOrganization(orgId) {
      dispatch(organization.goTo({ orgId }));
    },
  })
)(MissingAccessPage);
