import { connect } from 'react-redux';
import { organization } from '@bufferapp/publish-routes';
import { getAccessType } from './utils';

import MissingAccessPage from './components/MissingAccessPage';

export default connect(
  state => {
    const { isAdmin } = state.organizations.selected;
    const orgWithAccess = null; // TO-DO: update with global org switcher work
    return {
      orgName: state.organizations.selected?.name,
      orgNameWithAccess: orgWithAccess?.name,
      orgIdWithAccess: orgWithAccess?.id,
      ownerEmail: state.organizations.selected?.ownerEmail,
      accessType: getAccessType({ isAdmin, hasOrgWithAccess: !!orgWithAccess }),
    };
  },
  dispatch => ({
    switchOrganization(orgId) {
      dispatch(organization.goTo({ orgId }));
    },
  })
)(MissingAccessPage);
