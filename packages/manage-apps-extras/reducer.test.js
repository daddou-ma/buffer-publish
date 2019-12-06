import deepFreeze from 'deep-freeze';
import reducer, { actions, actionTypes } from './reducer';

describe('reducer', () => {
  const initialState = {
    showModalAppId: null,
    showModalAppName: '',
    connectedApps: [],
    submitting: false,
  };

  it('should initialize default state', () => {
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('REQUEST_OPEN_MODAL sets the app ID and app name for the modal', () => {
    const stateAfter = {
      ...initialState,
      showModalAppId: 'App1',
      showModalAppName: 'App One',
    };
    const action = {
      type: actionTypes.REQUEST_OPEN_MODAL,
      appId: 'App1',
      appName: 'App One',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('REQUEST_CLOSE_MODAL removes app ID and app name set for the modal', () => {
    const action = {
      type: actionTypes.REQUEST_CLOSE_MODAL,
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('REQUEST_REVOKE_APP removes the app from connected apps and the selected app ID and name', () => {
    const app1 = {
      id: 'app1',
      name: 'App One',
    };
    const app2 = {
      id: 'app2',
      name: 'App Two',
    };
    const stateBefore = {
      ...initialState,
      showModalAppId: 1,
      showModalAppName: 'App 1',
      connectedApps: [app1, app2],
    };
    const stateAfter = {
      ...initialState,
      connectedApps: [app2],
    };
    const action = {
      type: actionTypes.REQUEST_REVOKE_APP,
      appId: 'app1',
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('connectedApps_FETCH_SUCCESS adds the connected app', () => {
    const app1 = {
      id: 'id1',
      name: 'app1',
    };

    const stateAfter = {
      ...initialState,
      connectedApps: [app1],
    };

    const action = {
      type: 'connectedApps_FETCH_SUCCESS',
      result: [app1],
    };

    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('revokeConnectedApp_FETCH_START sets submitting to true', () => {
    const stateAfter = {
      ...initialState,
      submitting: true,
    };

    const action = {
      type: 'revokeConnectedApp_FETCH_START',
    };

    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('revokeConnectedApp_FETCH_FAIL sets submitting to false', () => {
    const stateBefore = {
      ...initialState,
      submitting: true,
    };

    const action = {
      type: 'revokeConnectedApp_FETCH_FAIL',
    };

    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(initialState);
  });

  it('revokeConnectedApp_FETCH_SUCCESS sets submitting to false', () => {
    const stateBefore = {
      ...initialState,
      submitting: true,
    };

    const action = {
      type: 'revokeConnectedApp_FETCH_SUCCESS',
    };

    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(initialState);
  });
});

describe('actions', () => {
  it('requestOpenModal triggers a REQUEST_OPEN_MODAL action', () => {
    const appId = 'app1';
    const appName = 'App one';
    expect(actions.requestOpenModal({ appId, appName })).toEqual({
      type: actionTypes.REQUEST_OPEN_MODAL,
      appId,
      appName,
    });
  });
  it('requestCloseModal triggers a REQUEST_CLOSE_MODAL action', () => {
    expect(actions.requestCloseModal()).toEqual({
      type: actionTypes.REQUEST_CLOSE_MODAL,
    });
  });
  it('requestRevokeApp triggers a REQUEST_REVOKE_APP action', () => {
    const appId = 'app1';
    expect(actions.requestRevokeApp({ appId })).toEqual({
      type: actionTypes.REQUEST_REVOKE_APP,
      appId,
    });
  });
});
