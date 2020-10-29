import { connect } from 'react-redux';
import { actions as modalReducers } from '@bufferapp/publish-modals/reducer';

import ThirdParty from './components/Loader';

export default connect(state => {
  const { modals } = state;

  const modalsShowing = modalReducers.isShowingModals({ modals });

  return {
    appCues: state.thirdparty.appCues,
    zendeskWidget: state.thirdparty.zendeskWidget,
    modalsShowing,
    userId: state.user?.id,
  };
})(ThirdParty);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
