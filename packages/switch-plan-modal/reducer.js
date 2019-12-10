import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals/reducer';
import { actionTypes as stripeActionTypes } from '@bufferapp/stripe/reducer';

export const actionTypes = keyWrapper('UPGRADE_MODAL', {
  STORE_VALUE: 0,
  SELECT_CYCLE: 0,
  CANCEL_TRIAL: 0,
  CLEAR_CARD_INFO: 0,
});

export const initialState = {
  plan: 'pro',
  cycle: 'year',
  card: {},
  source: 'unknown',
  dismissible: false,
  isPromo: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_CYCLE:
      return {
        ...state,
        cycle: action.cycle,
      };
    case actionTypes.STORE_VALUE:
      return {
        ...state,
        card: {
          ...state.card,
          [action.id]: action.value,
        },
      };
    case actionTypes.CLEAR_CARD_INFO:
      return {
        ...state,
        card: {},
        cycle: 'year',
        source: 'unknown',
      };
    case modalsActionTypes.SHOW_SWITCH_PLAN_MODAL:
      return {
        ...state,
        source: action.source || 'unknown',
        plan: action.plan || 'pro',
        cycle: action.isPromo && action.plan === 'pro' ? 'month' : 'year',
        isPromo: action.isPromo || false,
      };
    case modalsActionTypes.HIDE_SWITCH_PLAN_MODAL:
      return {
        ...state,
        source: initialState.source,
      };
    case stripeActionTypes.CREDIT_CARD_APPROVED:
      return {
        ...state,
        dismissible: true,
      };
    case stripeActionTypes.CREDIT_CARD_ERROR:
      return {
        ...state,
        card: {
          ...state.card,
          expMonth: state.card.exp_month,
          expYear: state.card.exp_year,
          addressZip: state.card.address_zip,
        },
      };
    default:
      return state;
  }
};

export const actions = {
  storeValue: (id, value) => ({
    type: actionTypes.STORE_VALUE,
    id,
    value,
  }),
  selectCycle: cycle => ({
    type: actionTypes.SELECT_CYCLE,
    cycle,
  }),
  cancelTrial: () => ({
    type: actionTypes.CANCEL_TRIAL,
  }),
  clearCardInfo: () => ({
    type: actionTypes.CLEAR_CARD_INFO,
  }),
};
