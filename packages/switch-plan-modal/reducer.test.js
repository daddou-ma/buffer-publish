import { actions as modalsActions } from '@bufferapp/publish-modals';

import reducer, { initialState, actions, actionTypes } from './reducer';

describe('reducer', () => {
  let state = {};

  describe('initial state', () => {
    beforeEach(() => {
      state = reducer(undefined, {
        type: 'TEST',
      });
    });
    it('has yearly cycle selected', () => expect(state.cycle).toBe('year'));
    it('has no card information', () => expect(state.card).toEqual({}));
    it('has unknown source', () => expect(state.source).toEqual('unknown'));
  });

  it('storeValue stores card information as <id, value> pairs', () => {
    state = reducer(undefined, actions.storeValue('cardName', 'Buffer'));
    expect(state.card.cardName).toEqual('Buffer');
  });
  it('selectCycle changes the cycle', () => {
    state = reducer(undefined, actions.selectCycle('monthly'));
    expect(state.cycle).toEqual('monthly');
  });
  it('stores the value of the source when modal is shown', () => {
    state = reducer(undefined, modalsActions.showSwitchPlanModal({ source: 'lisbon2018' }));
    expect(state.source).toEqual('lisbon2018');
  });
  it('resets the value of the source when modal is closed', () => {
    state = reducer(undefined, modalsActions.hideUpgradeModal());
    expect(state.source).toBe(initialState.source);
  });
});
