// import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('MANAGE_APPS', {
  REQUEST_OPEN_MODAL: 0,
  REQUEST_CLOSE_MODAL: 0,
  REQUEST_REVOKE_APP: 0,
});

const initialState = {
  showModalAppId: null,
  showModalAppName: '',
  connectedApps: [],
  submitting: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `connectedApps_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        connectedApps: action.result,
      };
    }
    case `revokeConnectedApp_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        submitting: true,
      };
    case `revokeConnectedApp_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `revokeConnectedApp_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        submitting: false,
      };
    case actionTypes.REQUEST_OPEN_MODAL:
      return {
        ...state,
        showModalAppId: action.appId,
        showModalAppName: action.appName,
      };
    case actionTypes.REQUEST_CLOSE_MODAL:
      return {
        ...state,
        showModalAppId: null,
        showModalAppName: '',
      };
    case actionTypes.REQUEST_REVOKE_APP:
      return {
        ...initialState,
        connectedApps: state.connectedApps.filter(
          app => app.id !== action.appId
        ),
      };
    default:
      return state;
  }
};

export const actions = {
  requestOpenModal: ({ appId, appName }) => ({
    type: actionTypes.REQUEST_OPEN_MODAL,
    appId,
    appName,
  }),
  requestCloseModal: () => ({
    type: actionTypes.REQUEST_CLOSE_MODAL,
  }),
  requestRevokeApp: ({ appId }) => ({
    type: actionTypes.REQUEST_REVOKE_APP,
    appId,
  }),
};
