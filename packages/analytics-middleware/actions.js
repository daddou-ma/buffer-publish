import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('ANALYTICS', {
  INIT: 'INIT',
  TRACK_EVENT: 'TRACK_EVENT',
  /* We need to include PUBLISH in the name since we are including analyze packages
  that have a PAGE_CHANGE actionType. This causes the action to be called from the analyze code */ 
  PUBLISH_PAGE_CHANGE: 'PUBLISH_PAGE_CHANGE',
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
      type: actionTypes.PUBLISH_PAGE_CHANGE,
      pageName,
      payload,
    };
  },
};

export default actions;
