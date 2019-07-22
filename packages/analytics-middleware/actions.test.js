import { actions, actionTypes } from './actions';

describe('actions', () => {
  it('init triggers INIT with userId and payload', () => {
    const userId = 'foo1';
    const payload = { foo: 'foo' };
    expect(actions.init(userId, payload)).toEqual({
      type: actionTypes.INIT,
      userId,
      payload,
    });
  });

  it('trackEvent triggers TRACK_EVENT with eventName and payload', () => {
    const eventName = 'event 1';
    const payload = { foo: 'foo' };
    expect(actions.trackEvent(eventName, payload)).toEqual({
      type: actionTypes.TRACK_EVENT,
      eventName,
      payload,
    });
  });

  it('pageChange triggers PAGE_CHANGE with pageName and payload', () => {
    const pageName = 'page 1';
    const payload = { foo: 'foo' };
    expect(actions.pageChange(pageName, payload)).toEqual({
      type: actionTypes.PAGE_CHANGE,
      pageName,
      payload,
    });
  });
});
