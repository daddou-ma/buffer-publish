import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('PUBLISH_ANALYTICS', {
  INIT: 'INIT',
  TRACK_EVENT: 'TRACK_EVENT',
  PAGE_CHANGE: 'PAGE_CHANGE',
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
