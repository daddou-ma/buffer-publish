const orgData =
  typeof window !== 'undefined' &&
  typeof window.bufferData !== 'undefined' &&
  typeof window.bufferData.organizations !== 'undefined' &&
  window.bufferData.organizations;

module.exports = (state = orgData || {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
