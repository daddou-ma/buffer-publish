import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('LANGUAGE_PREFERENCES', {
  SET_USER_LANGUAGE: 0,
});

export const initialState = {
  showStoryPreview: 'en-US',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export const actions = {
  setUserLanguage: ({ language }) => ({
    type: actionTypes.SET_USER_LANGUAGE,
    language,
  }),
};
