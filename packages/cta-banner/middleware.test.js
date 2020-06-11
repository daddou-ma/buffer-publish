import { actionTypes as modalActionTypes } from '@bufferapp/publish-modals/reducer';
import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  const next = jest.fn();

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('opens Premium Switch Plan Modal when Premium Trialist START_SUBSCRIPTION', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        user: {
          plan: 'premium_business',
        },
      }),
    };
    const action = {
      type: actionTypes.START_SUBSCRIPTION,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith({
      type: modalActionTypes.SHOW_SWITCH_PLAN_MODAL,
      source: 'cta_banner_upgrade_premium',
      plan: 'premium_business',
    });
  });

  it('opens small Switch Plan Modal when Small Business Trialist START_SUBSCRIPTION', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        user: {
          plan: 'small',
        },
      }),
    };
    const action = {
      type: actionTypes.START_SUBSCRIPTION,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith({
      type: modalActionTypes.SHOW_SWITCH_PLAN_MODAL,
      source: 'cta_banner_upgrade_small',
      plan: 'small',
    });
  });

  it('opens pro Switch Plan Modal when Pro Trialist START_SUBSCRIPTION', () => {
    const store = {
      dispatch: jest.fn(),
      getState: () => ({
        user: {
          plan: 'pro',
        },
      }),
    };
    const action = {
      type: actionTypes.START_SUBSCRIPTION,
    };
    middleware(store)(next)(action);
    expect(next).toBeCalledWith(action);
    expect(store.dispatch).toBeCalledWith({
      type: modalActionTypes.SHOW_SWITCH_PLAN_MODAL,
      source: 'cta_banner_upgrade_pro',
      plan: 'pro',
    });
  });
});
