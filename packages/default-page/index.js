import { connect } from 'react-redux';
import { getURL } from '@bufferapp/publish-server/formatters';

import DefaultPage from './components/DefaultPage';

export default connect(state => ({
  orgName: state.organizations.selected?.name,
  ownerEmail: state.organizations.selected?.ownerEmail,
  showPermissionsEmptyPage: !state.organizations.selected?.isAdmin,
  connectURL: state.organizations.selected?.shouldRedirectToAccountChannels
    ? getURL.getAccountChannelsURL()
    : getURL.getConnectSocialAccountURL(),
}))(DefaultPage);
