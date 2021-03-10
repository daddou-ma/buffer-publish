import { actionTypes } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const store = {
    dispatch: jest.fn(),
    getState: () => ({
      organizations: { selected: { shouldRedirectToAccountChannels: false } },
    }),
  };
  const next = jest.fn();
  window.location.assign = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const reconnectTwitterAction = {
    type: actionTypes.RECONNECT_PROFILE,
    id: 'twitter-id',
    service: 'twitter',
  };

  const reconnectInstagramAction = {
    type: actionTypes.RECONNECT_PROFILE,
    id: 'instagram-id',
    service: 'instagram',
  };

  it('should call next when running middleware', () => {
    middleware(store)(next)({ type: 'FOO' });
    expect(next).toBeCalled();
  });

  it('should redirect to the reconnect URL for a regular profile', () => {
    middleware(store)(next)(reconnectTwitterAction);
    expect(next).toBeCalled();
    expect(window.location.assign).toHaveBeenCalledWith(
      'https://local.buffer.com/oauth/reconnect/twitter-id'
    );
  });

  it('should redirect to the account channels for a regular profile', () => {
    const newStore = {
      dispatch: jest.fn(),
      getState: () => ({
        organizations: { selected: { shouldRedirectToAccountChannels: true } },
      }),
    };
    middleware(newStore)(next)(reconnectTwitterAction);
    expect(next).toBeCalled();
    expect(window.location.assign).toHaveBeenCalledWith(
      'https://account.local.buffer.com/channels'
    );
  });

  it('should load Instagram logout img and then redirect to the reconnect URL', () => {
    // This code ensures that we call the img.onerror right away for the sake of testing
    // (see the code in profiles-disconnected-modal/middleware.js)
    Object.defineProperty(global.Image.prototype, 'src', {
      set() {
        if (this.onerror) {
          this.onerror();
        }
      },
    });

    middleware(store)(next)(reconnectInstagramAction);
    expect(next).toBeCalled();
    expect(window.location.assign).toHaveBeenCalledWith(
      'https://local.buffer.com/oauth/reconnect/instagram-id'
    );
  });
});
