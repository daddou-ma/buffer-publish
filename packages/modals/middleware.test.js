import middleware from './middleware';
import { actions } from './reducer';

// jest.mock('buffermetrics');

// Object.defineProperty(window.location, 'hash', {
//   writable: true,
//   value: '#upgrade-to-pro',
// });

describe('middleware', () => {
  it('should show welcome modal when key is present', () => {
    window._showModal = {
      key: 'welcome-modal-1',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showWelcomeModal());
  });
  it('should show and track modal when key with source is present', () => {
    window._showModal = {
      key: 'upgrade-to-pro--profile_limit',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(actions.showUpgradeModal({ source: 'profile_limit' }));
  });
  it('should send \'unknown\' for key without source', () => {
    window._showModal = {
      key: 'upgrade-to-pro',
    };
    const next = jest.fn();
    const dispatch = jest.fn();
    const action = {
      type: 'APP_INIT',
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
