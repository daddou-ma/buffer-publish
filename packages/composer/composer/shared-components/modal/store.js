import { EventEmitter } from 'events';
import AppDispatcher from '../../dispatcher';
import ActionTypes from './actionTypes';

const CHANGE_EVENT = 'change';

const getInitialState = () => ({
  open: true,
  modalName: '',
  modalProps: {},
});

const state = getInitialState();

const Store = Object.assign({}, EventEmitter.prototype, {
  emitChange: () => Store.emit(CHANGE_EVENT),
  addChangeListener: callback => Store.on(CHANGE_EVENT, callback),
  removeChangeListener: callback =>
    Store.removeListener(CHANGE_EVENT, callback),
  getCurrentState: () => state,
  getInitialState,
});

const closeModal = () => {
  state.open = false;
};

const openModal = () => {
  state.open = true;
};

const setModal = modalName => {
  state.modalName = modalName;
};

const setModalProps = modalProps => {
  state.modalProps = modalProps;
};

AppDispatcher.register(payload => {
  switch (payload.action.actionType) {
    case ActionTypes.CLOSE_MODAL:
      closeModal();
      Store.emitChange();
      break;
    case ActionTypes.OPEN_MODAL:
      setModal(payload.action.name);
      setModalProps(payload.action.props);
      openModal();
      Store.emitChange();
      break;
    default:
      break;
  }
});

module.exports = Store;
