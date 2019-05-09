import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('thirdparty', {
  FULLSTORY: 0,
  APPCUES: 0,
  APPCUES_LOADED: 0,
});

const initialState = {
  appCues: { loaded: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPCUES_LOADED:
      return {
        ...state,
        appCues: { loaded: action.loaded },
      };
    default:
      return state;
  }
};

export const actions = {};
