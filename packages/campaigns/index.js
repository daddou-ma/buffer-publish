import { connect } from 'react-redux';

import CampaignsPage from './components/CampaignsPage';

export default connect(
  state => ({
    translations: state.i18n.translations.campaigns,
  }),
  dispatch => ({
    onCreateCampaignClick: () => {},
  })
)(CampaignsPage);
