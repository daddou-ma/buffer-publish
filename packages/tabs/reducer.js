import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('TABS', {
  SELECT_TAB: 0,
});

const initialState = {
  profiles: [],
  tabId: 'queue',
  selectedProfileId: '',
  selectedProfile: {},
  isBusinessAccount: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TAB: {
      return {
        ...state,
        tabId: action.tabId,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  selectTab: ({ tabId, profileId }) => ({
    type: actionTypes.SELECT_TAB,
    tabId,
    profileId,
  }),
};
