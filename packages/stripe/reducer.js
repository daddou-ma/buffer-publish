import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('STRIPE', {
  CREATE_SETUP_INTENT_REQUEST: 0,
  CREATE_SETUP_INTENT_SUCCESS: 0,
  CREDIT_CARD_VALIDATING: 0,
  CREDIT_CARD_ERROR: 0,
  CREDIT_CARD_APPROVED: 0,
  CHANGE_BILLING_CYCLE: 0,
  HANDLE_CARD_SETUP_REQUEST: 0,
  HANDLE_CARD_SETUP_SUCCESS: 0,
  HANDLE_CARD_SETUP_ERROR: 0,
});

const MONTHLY_CYCLE = 'month';
const YEARLY_CYCLE = 'year';

const initialState = {
  error: null,
  card: null,
  token: null,
  validating: false,
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
    case actionTypes.CREATE_SETUP_INTENT_SUCCESS:
      return {
        ...state,
        setupIntentClientSecret: action.setupIntentClientSecret,
        creatingSetupIntent: false,
      };
    case actionTypes.CREDIT_CARD_VALIDATING:
      return {
        ...state,
        validating: true,
        card: action.card,
      };
    case actionTypes.CREDIT_CARD_ERROR:
      return {
        ...state,
        validating: false,
        error: action.error,
      };
    case actionTypes.CREDIT_CARD_APPROVED:
      return {
        ...state,
        validating: false,
        token: action.token,
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
    type: actionTypes.HANDLE_CARD_SETUP_REQUEST,
  }),
  handleCardSetupSuccess: () => ({
    type: actionTypes.HANDLE_CARD_SETUP_SUCCESS,
  }),
  handleCardSetupError: () => ({
    type: actionTypes.HANDLE_CARD_SETUP_ERROR,
  }),
  validateCreditCard: card => ({
    type: actionTypes.CREDIT_CARD_VALIDATING,
    card,
  }),
  throwValidationError: error => ({
    type: actionTypes.CREDIT_CARD_ERROR,
    error,
  }),
  approveCreditCard: token => ({
    type: actionTypes.CREDIT_CARD_APPROVED,
    token,
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
