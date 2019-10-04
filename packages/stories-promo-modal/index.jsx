import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import StoriesPromoModal from './components/StoriesPromoModal';

export default connect(
  null,
  dispatch => ({
    onCloseModalClick: () => {
      dispatch(modalsActions.hideStoriesPromoModal());
      dispatch(dataFetchActions.fetch({
        name: 'readMessage',
        args: {
          message: 'user_saw_stories_promo',
        },
      }));
    },
    onStartTrialClick: () => {
      dispatch(dataFetchActions.fetch({
        name: 'readMessage',
        args: {
          message: 'user_saw_stories_promo',
        },
      }));
      window.location.assign(`${getURL.getStartTrialURL({
        plan: 'premium_business',
        cycle: 'month',
        cta: SEGMENT_NAMES.STORIES_PROMO_MODAL,
        nextUrl: 'https://publish.buffer.com',
      })}`);
    },
  }),
)(StoriesPromoModal);
