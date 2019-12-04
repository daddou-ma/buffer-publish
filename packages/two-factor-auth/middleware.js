import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

import { actions as notificationActions } from '@bufferapp/notifications';

import { actionTypes, actions } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.TRANSITION:
      /**
       * When the user clicks the disable toggle we hit the API
       * with an 'off' method to disable TFA
       */
      if (
        getState().twoFactorAuth.machineState === 'disabled' &&
        action.name === 'DISABLE'
      ) {
        dispatch(
          dataFetchActions.fetch({
            name: 'twoFactorUpdate',
            args: { tfaMethod: 'off' },
          })
        );
      }
      if (action.name === 'SHOW_RECOVERY') {
        const {
          twoFactorAuth: { recoveryCode },
        } = getState();
        if (!recoveryCode) {
          dispatch(dataFetchActions.fetch({ name: 'twoFactorRecovery' }));
        }
      }
      break;
    case actionTypes.SUBMIT_PHONE_NUMBER:
      dispatch(
        dataFetchActions.fetch({
          name: 'twoFactorUpdate',
          args: {
            tfaMethod: 'sms',
            tel: getState().twoFactorAuth.updatePhoneNumber,
            edit: getState().twoFactorAuth.editMode,
          },
        })
      );
      break;
    case actionTypes.SETUP_APP:
      dispatch(
        dataFetchActions.fetch({
          name: 'twoFactorUpdate',
          args: {
            tfaMethod: 'app',
            tel: null,
            edit: getState().twoFactorAuth.editMode,
          },
        })
      );
      break;
    case `twoFactorUpdate_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.args.tfaMethod === 'sms') {
        // We're on setupSMS, go the next page
        dispatch(actions.transition('NEXT'));
      }
      if (action.args.tfaMethod === 'app') {
        // We're on chooseMethod, show the QR code now
        dispatch(actions.transition('SETUP_APP'));
      }
      if (action.args.tfaMethod === 'off') {
        dispatch(
          notificationActions.createNotification({
            notificationType: 'success',
            message: 'Two Factor Authentication has been disabled',
          })
        );
      }
      break;
    case actionTypes.SUBMIT_CODE:
      dispatch(
        dataFetchActions.fetch({
          name: 'twoFactorConfirm',
          args: {
            code: action.code,
            initKey: getState().twoFactorAuth.initKey,
            tfaMethod: getState().twoFactorAuth.updateMethod,
            tel: getState().twoFactorAuth.updatePhoneNumber,
            edit: getState().twoFactorAuth.editMode,
          },
        })
      );
      break;
    case `twoFactorConfirm_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(actions.transition('CODE_ACCEPTED'));
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message:
            'Two Factor Authentication has been enabled for your account!',
        })
      );
      break;
    case actionTypes.RECOVERY_CODE_SELECTED:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Recovery code is copied to your clipboard!',
        })
      );
      break;
    default:
      break;
  }
};
