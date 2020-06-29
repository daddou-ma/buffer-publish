const profilesData =
  typeof window !== 'undefined' &&
  typeof window.bufferData !== 'undefined' &&
  typeof window.bufferData.profiles !== 'undefined' &&
  window.bufferData.profiles;

module.exports = (state = profilesData || [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};
