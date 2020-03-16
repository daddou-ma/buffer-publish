import deepFreeze from 'deep-freeze';
import reducer, { actions, initialState, actionTypes } from './reducer';

describe('reducer', () => {
  // Tests the default case in the reducer switch statement
  it('should initialize default state', () => {
    const action = {
      type: '',
    };
    // Protects state and actions from mutation
    deepFreeze(initialState);
    deepFreeze(action);

    // When state is undefined, it's supposed to return initial state
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('handles getCampaignsList_FETCH_START action', () => {
    const stateBefore = {
      ...initialState,
      isLoading: false,
    };
    const stateAfter = {
      ...initialState,
      isLoading: true,
    };
    const action = {
      type: 'getCampaignsList_FETCH_START',
      args: {},
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles getCampaignsList_FETCH_FAIL action', () => {
    const stateBefore = {
      ...initialState,
      isLoading: true,
    };
    const stateAfter = {
      ...initialState,
      isLoading: false,
    };
    const action = {
      type: 'getCampaignsList_FETCH_FAIL',
      args: {},
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles getCampaignsList_FETCH_SUCCESS action', () => {
    const stateBefore = {
      ...initialState,
      isLoading: true,
      campaigns: [],
    };
    const stateAfter = {
      ...initialState,
      isLoading: false,
      campaigns: [],
    };
    const action = {
      type: 'getCampaignsList_FETCH_SUCCESS',
      result: [],
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // Test action creators:
  describe('action creators', () => {
    it('creates a FETCH_CAMPAIGNS action', () => {
      const expectedAction = {
        type: actionTypes.FETCH_CAMPAIGNS,
      };
      expect(actions.fetchCampaigns()).toEqual(expectedAction);
    });
  });
});
