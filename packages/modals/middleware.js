import { actionTypes } from '@bufferapp/async-data-fetch';
import { actions } from './reducer';

const checkHashShowUpgradeModal = () => {
  const hash = window.location.hash;
  let showUpgradeModal = false;
  let source = null;
  if (hash.indexOf('#upgrade-to-pro') === 0) {
    showUpgradeModal = true;
    // #show-upgrade-modal--profile_limit => 'profile_limit'
    source = hash.split('--')[1] || 'unknown';
  }
  return {
    showUpgradeModal,
    source,
  };
};

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `user_${actionTypes.FETCH_SUCCESS}`: {
      const { showUpgradeModal, source } = checkHashShowUpgradeModal();
      if (showUpgradeModal) {
        dispatch(actions.showUpgradeModal({ source }));
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
