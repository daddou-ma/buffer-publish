import { actionTypes } from '@bufferapp/async-data-fetch';

import { actions } from './reducer';
import { shouldShowUpgradeModal, getSourceFromHash, shouldShowWelcomeModal } from './util/window-hash';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `user_${actionTypes.FETCH_SUCCESS}`: {
      if (shouldShowUpgradeModal()) {
        dispatch(actions.showUpgradeModal({ source: getSourceFromHash() }));
      }
      if (shouldShowWelcomeModal()) {
        dispatch(actions.showWelcomeModal());
      }
      break;
    }
    case 'COMPOSER_EVENT':
      if (action.eventType === 'show-upgrade-modal') {
        dispatch(actions.showUpgradeModal({ source: 'queue_limit' }));
      }
      break;
    default:
      break;
  }
};
