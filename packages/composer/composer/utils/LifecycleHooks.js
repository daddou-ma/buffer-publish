import AppStore from '../stores/AppStore';
import events from './Events';

const AppHooks = {
  handleAppLoaded: () => {
    const { shouldDisplayHelpButton } = AppStore.getMetaData();

    events.emit('loaded', { shouldDisplayHelpButton });
  },

  handleSavedDrafts: ({ message } = {}) => {
    events.emit('saved-drafts', { message });
  },

  handleBackdropClicked: () => {
    events.emit('backdrop-clicked');
  },

  // after a user starts a trial, send message with updated userData
  handleStartTrial: ({ message, removeScope }) => {
    events.emit('start-trial', { message, removeScope });
  },

  handleActionTaken: (message = {}) => {
    events.emit('action-taken', message);
  },

  closeComposer: () => events.emit('closed'),
};

export default AppHooks;
