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

  it('should handle deleteCampaign_FETCH_SUCCESS action type for a new campaign', () => {
    const stateBefore = {
      ...initialState,
      loading: true,
    };
    const stateAfter = {
      ...initialState,
      loading: false,
    };
    const action = {
      type: 'deleteCampaign_FETCH_SUCCESS',
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  // Test action creators:
  describe('action creators', () => {
    it('should create a DELETE_CAMPAIGN action', () => {
      const expectedAction = {
        type: actionTypes.DELETE_CAMPAIGN,
      };
      expect(actions.deleteCampaign()).toEqual(expectedAction);
    });
  });
});
