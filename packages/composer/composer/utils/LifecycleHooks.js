import AppStore from '../stores/AppStore';
import events from './Events';

const AppHooks = {
  handleAppLoaded: () => {
    const { shouldDisplayHelpButton } = AppStore.getMetaData();
    const { isFreeUser } = AppStore.getUserData();

    events.emit('loaded', { isFreeUser, shouldDisplayHelpButton });
  },

  handleSavedDrafts: ({ message } = {}) => {
    events.emit('saved-drafts', { message });
  },

  handleBackdropClicked: () => {
    events.emit('backdrop-clicked');
  },

  handleStartTrial: ({ message }) => {
    events.emit('start-trial', message);
  },

  handleActionTaken: (message = {}) => {
    events.emit('action-taken', message);
  },

  closeComposer: () => events.emit('closed'),
};

export default AppHooks;
