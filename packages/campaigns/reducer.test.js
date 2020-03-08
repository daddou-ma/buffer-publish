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

  it('should handle getCampaign_FETCH_SUCCESS action type for a new campaign', () => {
    const newCampaign = { id: 'id1', name: 'campaignA', color: '#fff' };
    const stateBefore = {
      ...initialState,
      campaigns: [],
    };
    const stateAfter = {
      ...initialState,
      campaigns: [newCampaign],
      currentCampaign: newCampaign,
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
    expect(stateAfter.campaigns.length).toEqual(1);
  });

  it('should handle getCampaign_FETCH_SUCCESS action type, when the campaign added already existed', () => {
    const campaigns = [
      { id: 'id1', name: 'campaignA', color: '#000' },
      { id: 'id2', name: 'campaignB', color: '#fff' },
    ];
    const newCampaign = { id: 'id2', name: 'campaignB', color: '#fff' };
    const stateBefore = {
      ...initialState,
      campaigns,
    };
    const stateAfter = {
      ...initialState,
      campaigns,
      currentCampaign: newCampaign,
      campaignId: newCampaign.id,
    };
    const action = {
      type: 'getCampaign_FETCH_SUCCESS',
      result: newCampaign,
      args: {
        campaignId: 'id2',
      },
    };
    deepFreeze(stateBefore);
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
    expect(stateAfter.campaigns.length).toEqual(2);
  });

  // Test action creators:
  describe('action creators', () => {
    it('should create a FETCH_CAMPAIGN action', () => {
      const campaignId = 'id2';
      const expectedAction = {
        type: actionTypes.FETCH_CAMPAIGN,
        campaignId: 'id2',
      };
      expect(actions.fetchCampaign(campaignId)).toEqual(expectedAction);
    });
  });
});
