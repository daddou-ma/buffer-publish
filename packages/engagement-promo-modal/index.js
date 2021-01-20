import { connect } from 'react-redux';
import { actions as modalActions } from '@bufferapp/publish-modals/reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

import EngagementPromoModal from './components/EngagementPromoModal';

export default connect(
  state => ({
    alreadySawModal:
      Object.keys(state.user).length > 0
        ? state.user.messages?.includes('user_saw_engagement_promo')
        : true,
  }),
  dispatch => ({
    dismissModal: () => {
      dispatch(modalActions.hideEngagementPromoModal());
      dispatch(
        dataFetchActions.fetch({
          name: 'readMessage',
          args: {
            message: 'user_saw_engagement_promo',
          },
        })
      );
    },
    startTrial: () => {
      dispatch(
        dataFetchActions.fetch({
          name: 'readMessage',
          args: {
            message: 'user_saw_engagement_promo',
          },
        })
      );
      window.location.assign(
        'https://login.buffer.com/signup?product=publish=pro&cycle=month&cta=publish-engagementPromoModal-buttonBottom-publishPro-1'
      );
    },
  })
)(EngagementPromoModal);
