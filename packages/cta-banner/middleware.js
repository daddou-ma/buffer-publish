import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actionTypes } from '.';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.START_SUBSCRIPTION:
      dispatch(modalsActions.showUpgradeModal({ source: 'cta_banner_upgrade' }));
      break;
    default:
      break;
  }
};
