import { actions } from './reducer';
import {
  shouldShowUpgradeModal,
  shouldShowWelcomeModal,
  getSourceFromKey,
} from './util/showModal';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT': {
      if (shouldShowUpgradeModal()) {
        dispatch(actions.showUpgradeModal({ source: getSourceFromKey() }));
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
