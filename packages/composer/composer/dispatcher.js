import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();

const METHODS = {
  handleViewAction: 'VIEW_ACTION',
  handleRouterAction: 'ROUTER_ACTION',
  handleApiAction: 'API_ACTION',
  handlePusherAction: 'PUSHER_ACTION',
};

const createHandler = function(source) {
  return function(action) {
    const _this = this;
    const isDispatching = AppDispatcher.isDispatching();
    const dispatchOptions = {
      source,
      action,
    };

    // If the dispatcher is currently dispatching
    // then add the next dispatch into the event queue
    if (isDispatching) {
      setTimeout(function() {
        _this.dispatch(dispatchOptions);
      }, 0);
    } else {
      this.dispatch(dispatchOptions);
    }
  };
};

Object.entries(METHODS).forEach(([method, action]) => {
  AppDispatcher[method] = createHandler(action);
});

export default AppDispatcher;
