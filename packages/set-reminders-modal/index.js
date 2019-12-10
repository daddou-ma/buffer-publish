import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import SetRemindersModal from './components/SetRemindersModal';

export default connect(
  state => ({
    translations: state.i18n.translations['set-reminders-modal'],
  }),
  dispatch => ({
    onCloseModalClick: () => {
      dispatch(modalsActions.hideSetRemindersModal());
    },
    onSetRemindersClick: () => {
      window.location.assign(
        `${getURL.getRemindersURL({
          cta: SEGMENT_NAMES.REMINDERS_MODAL,
        })}`
      );
    },
  })
)(SetRemindersModal);
