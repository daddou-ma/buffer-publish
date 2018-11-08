import { actionTypes } from '@bufferapp/async-data-fetch';
import { actions } from './reducer';
import { shouldShowModal, getSourceFromHash } from './util/window-hash';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `user_${actionTypes.FETCH_SUCCESS}`: {
      if (shouldShowModal()) {
        dispatch(actions.showUpgradeModal({ source: getSourceFromHash() }));
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
