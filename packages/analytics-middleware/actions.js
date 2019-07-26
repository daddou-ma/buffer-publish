import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('ANALYTICS', {
  INIT: 'INIT',
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
    console.log('eventName action', eventName, payload);
    return {
      type: actionTypes.TRACK_EVENT,
      eventName,
      payload,
    };
  },
};

export default actions;
