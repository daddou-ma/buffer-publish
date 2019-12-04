import reducer, { initialState, actions } from './reducer';

describe('reducer', () => {
  it('exists', () => {
    expect(reducer).toBeDefined();
  });
  it('returns initial state', () => {
    expect(reducer(initialState, { type: 'FOO' })).toEqual(initialState);
    expect(reducer(undefined, { type: 'FOO' })).toEqual(initialState);
  });
  it('handles a state transition', () => {
    const actual = reducer(initialState, actions.transition('ENABLE'));
    expect(actual.machineState).toEqual('chooseMethod');
  });
  it('ignores invalid transitions', () => {
    const actual = reducer(initialState, actions.transition('FOOBAR'));
    expect(actual.machineState).toEqual(initialState.machineState);
  });
  it('sets phone number', () => {
    const actual = reducer(initialState, actions.setPhoneNumber('foo'));
    expect(actual.updatePhoneNumber).toEqual('foo');
  });
  it('loads enabled twofactor data from user', () => {
    const actual = reducer(initialState, {
      type: 'user_FETCH_SUCCESS',
      result: {
        twofactor: {
          type: 'sms',
          tel: '5146766445',
        },
      },
    });
    expect(actual).toEqual({
      ...initialState,
      machineState: 'enabled',
      isEnabled: true,
      method: 'sms',
      phoneNumber: '5146766445',
      updatePhoneNumber: '5146766445',
    });
  });
  it('loads disabled twofactor data from user', () => {
    const actual = reducer(initialState, {
      type: 'user_FETCH_SUCCESS',
      result: {
        twofactor: null,
      },
    });
    expect(actual).toEqual({
      ...initialState,
      machineState: 'disabled',
      isEnabled: false,
      method: '',
      phoneNumber: '',
      updatePhoneNumber: '',
    });
  });
  it('sets loading and error state when starting TFA update', () => {
    const actual = reducer(initialState, {
      type: 'twoFactorUpdate_FETCH_START',
    });
    expect(actual).toEqual({
      ...initialState,
      loading: true,
      error: '',
    });
  });
  it('sets the TFA data after successful update', () => {
    const actual = reducer(initialState, {
      type: 'twoFactorUpdate_FETCH_SUCCESS',
      args: {
        tfaMethod: 'app',
      },
      result: {
        init_key: 'init_key',
        qr_code: 'qr_code',
      },
    });
    expect(actual).toEqual({
      ...initialState,
      initKey: 'init_key',
      qrCode: 'qr_code',
      loading: false,
      error: '',
    });
  });
  it('handles successful disabling of TFA', () => {
    const actual = reducer(initialState, {
      type: 'twoFactorUpdate_FETCH_SUCCESS',
      args: {
        tfaMethod: 'off',
      },
      result: {
        success: true,
      },
    });
    expect(actual).toEqual({
      ...initialState,
      loading: false,
      error: '',
    });
  });
  it('sets the tfa data after the code is confirmed', () => {
    const actual = reducer(
      {
        ...initialState,
        updateMethod: 'sms',
        updatePhoneNumber: 'phone',
      },
      {
        type: 'twoFactorConfirm_FETCH_SUCCESS',
        result: {
          recovery: 'recovery',
        },
      }
    );
    expect(actual).toEqual({
      ...initialState,
      updateMethod: 'sms',
      updatePhoneNumber: 'phone',
      method: 'sms',
      phoneNumber: 'phone',
      recoveryCode: 'recovery',
      loading: false,
      error: '',
    });
  });
  it('sets error for failure', () => {
    const actual = reducer(initialState, {
      type: 'twoFactorConfirm_FETCH_FAIL',
      result: {
        error: 'oops!',
      },
    });
    expect(actual).toEqual({
      ...initialState,
      loading: false,
      error: 'oops!',
    });
  });
  it('sets other error for failure', () => {
    const actual = reducer(initialState, {
      type: 'twoFactorUpdate_FETCH_FAIL',
      error: 'oops!',
    });
    expect(actual).toEqual({
      ...initialState,
      loading: false,
      error: 'oops!',
    });
  });
});
