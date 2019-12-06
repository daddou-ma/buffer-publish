// TODO: clean up w/ newer syntax, and perhaps use vanilla Flux dispatcher from Facebook instead

var Dispatcher = require('flux').Dispatcher;
// buffer.data.profiles

/**
 * Testing the idea of using an event PubSub or "Dispatcher".
 * Using this to decouple UI events and changes in Models + Collections.
 *
 *   http://facebook.github.io/flux/docs/dispatcher.html
 *
 * Example dispatch with a payload
 *
 *   AppDispatcher.handleViewAction({
 *     actionType: ActionTypes.SELECT_PROFILE,
 *     id: '5463a800b0e6df64097b23c6'
 *   });
 *
 */

var AppDispatcher = new Dispatcher();

var METHODS = {
  handleViewAction: 'VIEW_ACTION',
  handleRouterAction: 'ROUTER_ACTION',
  handleApiAction: 'API_ACTION',
  handlePusherAction: 'PUSHER_ACTION',
};

var createHandler = function(source) {
  return function(action) {
    var _this = this;
    var isDispatching = AppDispatcher.isDispatching();
    var dispatchOptions = {
      source: source,
      action: action,
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

for (var method in METHODS) {
  AppDispatcher[method] = createHandler(METHODS[method]);
}

module.exports = AppDispatcher;
