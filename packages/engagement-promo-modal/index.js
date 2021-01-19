import { connect } from 'react-redux';
import { actions as modalActions } from '@bufferapp/publish-modals/reducer';

import EngagementPromoModal from './components/EngagementPromoModal';

export default connect(
  state => ({}),
  dispatch => ({
    dismissModal: () => dispatch(modalActions.hideEngagementPromoModal()),
  })
)(EngagementPromoModal);
