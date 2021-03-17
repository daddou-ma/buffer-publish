import { actionTypes } from '@bufferapp/async-data-fetch';
import { logoutUrl } from '@bufferapp/session-manager';

export default ({ getState }) => next => action => {
  next(action);
  if (
    action.type === 'getGlobalOrganizationId_FETCH_FAIL' &&
    action.error === 'Unauthorized'
  ) {
    console.log('global org id fetch fail', action);
    const {
      environment: { environment },
    } = getState();
    // redirect to logout url
    // this will clean up cookies and show the login screen
    window.location.replace(
      logoutUrl({
        production: environment === 'production',
      })
    );
  }
};
