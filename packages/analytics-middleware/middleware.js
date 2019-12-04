import { actionTypes } from './actions';

export default store => next => action => {
  // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.INIT:
      if (window.analytics) {
        window.analytics.identify(action.userId, action.payload);
      }
      break;
    case actionTypes.TRACK_EVENT:
      if (window.analytics) {
        window.analytics.track(
          action.eventName,
          Object.assign(
            {
              product: window.PRODUCT_TRACKING_KEY,
              clientName: window.CLIENT_NAME,
            },
            action.payload
          )
        );
      }
      break;
    case actionTypes.PAGE_CHANGE:
      // currently using track event for page change logic, leaving here for now
      if (window.analytics) {
        window.analytics.page(
          action.pageName,
          Object.assign(
            {
              product: window.PRODUCT_TRACKING_KEY,
            },
            action.payload
          )
        );
      }
      break;
    default:
      break;
  }
};
