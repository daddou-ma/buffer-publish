import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('LANGUAGE_PREFERENCES', {
  SET_USER_LANGUAGE: 0,
});

export const actions = {
  setUserLanguage: ({ language }) => ({
    type: actionTypes.SET_USER_LANGUAGE,
    language,
  }),
};
