import { connect } from 'react-redux';
import { organization } from '@bufferapp/publish-routes';
import { getAccessType } from './utils';

import MissingAccessPage from './components/MissingAccessPage';

export default connect(
  state => {
    const isAdmin = state.organizations.selected?.role === 'admin';
    const orgWithAccess = '';
    return {
      orgName: state.organizations.selected?.name,
      orgWithAccess: '',
      orgWithAccessId: '',
      ownerEmail: state.organizations.selected?.ownerEmail,
      accessType: getAccessType({ isAdmin, orgWithAccess }),
    };
  },
  (dispatch, ownProps) => ({
    switchOrganization() {
      const organizationId = ownProps.orgWithAccessId;
      dispatch(organization.goTo({ orgId: organizationId }));
    },
  })
)(MissingAccessPage);
