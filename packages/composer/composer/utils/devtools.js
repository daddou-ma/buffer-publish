const combinedStores = {};

// Boot up
let reduxDevTools;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect({
    name: 'Buffer Composer',
  });
}

const registerStore = (store, initialState) => {
  if (reduxDevTools) {
    combinedStores[store] = initialState;
    reduxDevTools.send('@@INIT_' + store.toUpperCase(), combinedStores);
  } else {
    if (window.location.href.indexOf('.local') > -1) {
      console.warn(
        'Install the Redux DevTools extension for a better developer experience!'
      );
      console.log('👉 https://github.com/zalmoxisus/redux-devtools-extension');
    }
  }
};

const sendToMonitor = (store, action, state) => {
  if (reduxDevTools) {
    combinedStores[store] = state;
    reduxDevTools.send({ ...action, type: action.actionType }, combinedStores);
  }
};

export { registerStore, sendToMonitor };
