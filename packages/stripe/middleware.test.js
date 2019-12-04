/* global Stripe */

import {
  actions as asyncDataFetchActions,
  actionTypes as asyncDataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';

import middleware from './middleware';
import { actions, actionTypes } from './reducer';

describe('middleware', () => {
  it('should trigger a createSetupIntent request', () => {
    const dispatch = jest.fn();
    const next = jest.fn();
    const action = {
      type: actionTypes.CREATE_SETUP_INTENT_REQUEST,
    };
    middleware({ dispatch })(next)(action);
    expect(dispatch).toBeCalledWith(
      asyncDataFetchActions.fetch({
        name: 'createSetupIntent',
        args: {},
      })
    );
  });

  it('should trigger a switchPlan on handleCardSetupSuccess', () => {
    const dispatch = jest.fn();
    const next = jest.fn();
    const action = {
      type: actionTypes.HANDLE_SETUP_CARD_SUCCESS,
      cycle: 'year',
      plan: 'premium_business',
      source: 'queue_limit',
      paymentMethodId: 'pm_0FEigk47hwqlaZWUt3rg5WTQ',
    };

    middleware({ dispatch })(next)(action);
    expect(dispatch).toBeCalledWith(
      asyncDataFetchActions.fetch({
        name: 'switchPlan',
        args: {
          cycle: action.cycle,
          plan: action.plan,
          cta: SEGMENT_NAMES.QUEUE_LIMIT_PRO_UPGRADE,
          paymentMethodId: action.paymentMethodId,
        },
      })
    );
  });

  it('should trigger a createSetupIntent success', () => {
    const dispatch = jest.fn();
    const next = jest.fn();
    const action = {
      type: `createSetupIntent_${asyncDataFetchActionTypes.FETCH_SUCCESS}`,
      result: {
        setup_intent: {
          client_secret:
            'seti_0FEiYc47iwqlrZWUfKe1S08B_secret_FkCyRQxVyO2DP5PewgO9lkRjLutaRtP',
        },
      },
    };
    middleware({ dispatch })(next)(action);
    expect(dispatch).toBeCalledWith(
      actions.createSetupIntentSuccess(action.result.setup_intent.client_secret)
    );
  });
});
