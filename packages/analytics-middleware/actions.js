import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('ANALYTICS', {
  INIT: 'INIT',
  PAGE_CHANGE: 'PAGE_CHANGE',
  TRACK_EVENT: 'TRACK_EVENT',
});

export const actions = {
  init(userId, payload) {
    return {
      type: actionTypes.INIT,
      userId,
      payload,
    };
  },
  trackEvent(eventName, payload) {
    return {
      type: actionTypes.TRACK_EVENT,
      eventName,
      payload,
    };
  },
  pageChange(pageName, payload) {
    return {
      type: actionTypes.PAGE_CHANGE,
      pageName,
      payload,
    };
  },
};

export default actions;
