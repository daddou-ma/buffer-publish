import { connect } from 'react-redux';
import AppsAndExtras from './components/AppsAndExtras';
import { actions } from './reducer';

export default connect(
  state => ({
    showModalAppId: state.manageAppsExtras.showModalAppId,
    showModalAppName: state.manageAppsExtras.showModalAppName,
    connectedApps: state.manageAppsExtras.connectedApps,
    submitting: state.manageAppsExtras.submitting,
  }),
  dispatch => ({
    onRequestOpenModal: ({ appId, appName }) => {
      dispatch(actions.requestOpenModal({ appId, appName }));
    },
    onRequestCloseModal: () => {
      dispatch(actions.requestCloseModal());
    },
    onConfirmRevokeApp: ({ appId }) => {
      dispatch(actions.requestRevokeApp({ appId }));
    },
  })
)(AppsAndExtras);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
