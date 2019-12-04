// Edited from: https://gist.github.com/gaearon/886641422b06a779a328

const observeStore = (store, predicate) => {
  let performCheck;

  return new Promise(resolve => {
    performCheck = () => {
      if (predicate.call(null, store)) {
        resolve();
        store.removeChangeListener(performCheck);
      }
    };

    store.addChangeListener(performCheck);
    performCheck();
  });
};

export { observeStore };
