import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import StoriesPromoModal from './components/StoriesPromoModal';

export default connect(
  dispatch => ({
    onCloseModalClick: () => dispatch(modalsActions.hideStoriesPromoFreeModal()),
    onStartTrialClick: () => window.location.assign(`${getURL.getStartTrialURL({
      plan: 'premium_business',
      cycle: 'month',
      cta: SEGMENT_NAMES.STORIES_PROMO_MODAL,
      nextUrl: 'https://publish.buffer.com',
    })}`),
  }),
)(StoriesPromoModal);
