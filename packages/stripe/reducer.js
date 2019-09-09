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
  creatingSetupIntent: false,
  setupIntentClientSecret: '',
  validatingCardSetup: false,
  handleCardSetupError: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SETUP_INTENT_REQUEST:
      return {
        ...state,
        creatingSetupIntent: true,
      };
    case actionTypes.CREATE_SETUP_INTENT_SUCCESS:
      return {
        ...state,
        setupIntentClientSecret: action.setupIntentClientSecret,
        creatingSetupIntent: false,
      };
    case actionTypes.HANDLE_SETUP_CARD_REQUEST:
      return {
        ...state,
        validatingCardSetup: true,
      };
    case actionTypes.HANDLE_SETUP_CARD_SUCCESS:
      return {
        ...state,
        validatingCardSetup: false,
      };
    case actionTypes.HANDLE_SETUP_CARD_ERROR:
      return {
        ...state,
        validatingCardSetup: false,
        handleCardSetupError: 'Add error here',
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
  handleCardSetupRequest: () => ({
    type: actionTypes.HANDLE_SETUP_CARD_REQUEST,
  }),
  handleCardSetupSuccess: ({
    cycle,
    source,
    plan,
    paymentMethodId,
  }) => ({
    type: actionTypes.HANDLE_SETUP_CARD_SUCCESS,
    paymentMethodId,
    cycle,
    source,
    plan,
  }),
  handleCardSetupError: err => ({
    type: actionTypes.HANDLE_SETUP_CARD_ERROR,
    errorMessage: err,
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
