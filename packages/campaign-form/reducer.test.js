import deepFreeze from 'deep-freeze';
import reducer, { initialState } from './reducer';

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

  it('handles createCampaign_FETCH_START action', () => {
    const stateBefore = {
      ...initialState,
      isLoading: false,
    };
    const stateAfter = {
      ...initialState,
      isLoading: true,
    };
    const action = {
      type: 'createCampaign_FETCH_START',
      args: {
        campaignId: 'id1',
      },
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles getCampaign_FETCH_SUCCESS action type for a new campaign', () => {
    const newCampaign = { id: 'id1', name: 'campaignA', color: '#fff' };
    const stateBefore = {
      ...initialState,
      campaign: {},
    };
    const stateAfter = {
      ...initialState,
      campaign: newCampaign,
      campaignId: newCampaign.id,
    };
    const action = {
      type: 'getCampaign_FETCH_SUCCESS',
      result: newCampaign,
      args: {
        campaignId: 'id1',
      },
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
