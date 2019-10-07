import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('PLAN', {
  SELECT_PREMIUM_PLAN: 0,
});

const initialState = {
  selectedPremiumPlan: 1,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_PREMIUM_PLAN:
      return {
        ...state,
        selectedPremiumPlan: action.args.selectedPremiumPlan,
      };
    default:
      return state;
  }
};

export const actions = {
  setSelectedPlan: ({ selectedPlan }) => ({
    type: actionTypes.SELECT_PREMIUM_PLAN,
    args: {
      selectedPremiumPlan: selectedPlan,
    },
  }),
};
