import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('STRIPE', {
  CREATE_SETUP_INTENT_REQUEST: 0,
  CREATE_SETUP_INTENT_SUCCESS: 0,
  CHANGE_BILLING_CYCLE: 0,
  HANDLE_SETUP_CARD_REQUEST: 0,
  HANDLE_SETUP_CARD_SUCCESS: 0,
  HANDLE_SETUP_CARD_ERROR: 0,
});

const MONTHLY_CYCLE = 'month';
const YEARLY_CYCLE = 'year';

const initialState = {
  error: null,
  setupIntentClientSecret: '',
  validating: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SETUP_INTENT_REQUEST:
      return {
        ...state,
        validating: true,
      };
    case actionTypes.CREATE_SETUP_INTENT_SUCCESS:
      return {
        ...state,
        setupIntentClientSecret: action.setupIntentClientSecret,
        validating: false,
      };
    case actionTypes.HANDLE_SETUP_CARD_REQUEST:
      return {
        ...state,
        validating: true,
      };
    case actionTypes.HANDLE_SETUP_CARD_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.HANDLE_SETUP_CARD_ERROR:
      return {
        ...state,
        validating: false,
        error: action.error,
      };
    case actionTypes.CHANGE_BILLING_CYCLE:
      return {
        ...state,
        cycle: action.cycle,
      };
    default:
      return state;
  }
};

export const actions = {
  createSetupIntentRequest: () => ({
    type: actionTypes.CREATE_SETUP_INTENT_REQUEST,
  }),
  createSetupIntentSuccess: setupIntentClientSecret => ({
    type: actionTypes.CREATE_SETUP_INTENT_SUCCESS,
    setupIntentClientSecret,
  }),
  handleCardSetupRequest: (
    stripe,
    setupIntentClientSecret,
    source,
    plan,
    cycle
  ) => ({
    type: actionTypes.HANDLE_SETUP_CARD_REQUEST,
    stripe,
    setupIntentClientSecret,
    source,
    plan,
    cycle,
  }),
  handleCardSetupSuccess: (cycle, source, plan, paymentMethodId) => ({
    type: actionTypes.HANDLE_SETUP_CARD_SUCCESS,
    paymentMethodId,
    cycle,
    source,
    plan,
  }),
  handleCardSetupError: err => ({
    type: actionTypes.HANDLE_SETUP_CARD_ERROR,
    error: err,
  }),
  setMonthlyCycle: () => ({
    type: actionTypes.CHANGE_BILLING_CYCLE,
    cycle: MONTHLY_CYCLE,
  }),
  setYearlyCycle: () => ({
    type: actionTypes.CHANGE_BILLING_CYCLE,
    cycle: YEARLY_CYCLE,
  }),
};
