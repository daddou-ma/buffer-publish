import middleware from './middleware';
import { actions } from './reducer';

// jest.mock('buffermetrics');

// Object.defineProperty(window.location, 'hash', {
//   writable: true,
//   value: '#upgrade-to-pro',
// });

describe('middleware', () => {
  it('should show welcome modal when hash is present', () => {
    history.replaceState(undefined, undefined, '#welcome-modal-1');
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'user_FETCH_SUCCESS',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showWelcomeModal());
  });
  it('should show and track modal when hash is present', () => {
    history.replaceState(undefined, undefined, '#upgrade-to-pro--profile_limit');
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'user_FETCH_SUCCESS',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal({ source: 'profile_limit' }));
  });
  it('should send \'unknown\' for hash without source', () => {
    history.replaceState(undefined, undefined, '#upgrade-to-pro');
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'user_FETCH_SUCCESS',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal({ source: 'unknown' }));
  });
  it('should show and track upgrade modal when triggered from composer', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'COMPOSER_EVENT',
      eventType: 'show-upgrade-modal',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal({ source: 'queue_limit' }));
  });
});
