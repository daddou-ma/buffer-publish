import deepFreeze from 'deep-freeze';
import reducer, { actions, actionTypes } from './reducer';

describe('reducer', () => {
  const initialState = [];
  const profile = { id: 'id1', organizationId: 'org1' };
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

  it('adds new profile when it is not in the profiles list, on singleProfile_FETCH_SUCCESS action type', () => {
    const stateBefore = [...initialState];

    const stateAfter = [...initialState, profile];

    const action = {
      type: 'singleProfile_FETCH_SUCCESS',
      args: {
        profileId: 'id1',
      },
      result: profile,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('updates profile when it is in the profiles list, on singleProfile_FETCH_SUCCESS action type', () => {
    const stateBefore = [...initialState, profile];
    const newProfile = { id: 'id1', organizationId: 'org1', type: 'twitter' };

    const stateAfter = [...initialState, newProfile];

    const action = {
      type: 'singleProfile_FETCH_SUCCESS',
      args: {
        profileId: 'id1',
      },
      result: newProfile,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // Test action creators:
  describe('action creators', () => {
    it('should create a FETCH_SINGLE_PROFILE action', () => {
      const params = {
        profileId: 'id1',
        message: 'hello',
      };
      const expectedAction = {
        type: actionTypes.FETCH_SINGLE_PROFILE,
        profileId: 'id1',
        message: 'hello',
      };
      expect(actions.fetchSingleProfile(params)).toEqual(expectedAction);
    });
  });
});
