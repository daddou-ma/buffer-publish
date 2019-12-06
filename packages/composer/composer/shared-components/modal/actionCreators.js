import AppDispatcher from '../../dispatcher';
import ActionTypes from './actionTypes';

const ActionCreators = {
  closeModal: element =>
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.CLOSE_MODAL,
      element,
    }),

  openModal: (name, props) =>
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.OPEN_MODAL,
      name,
      props,
    }),
};

module.exports = ActionCreators;
