let userData =
  typeof window !== 'undefined' &&
  typeof window.bufferData !== 'undefined' &&
  typeof window.bufferData.user !== 'undefined' &&
  window.bufferData.user;

module.exports = (state = userData || {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
