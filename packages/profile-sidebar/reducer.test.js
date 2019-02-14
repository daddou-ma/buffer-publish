import deepFreeze from 'deep-freeze';
import reducer, { actions, actionTypes, initialState } from './reducer';

import profiles from './mockData/profiles';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      profiles: [],
      loading: false,
      selectedProfileId: '',
      selectedProfile: {},
      isBusinessAccount: false,
      isLockedProfile: false,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should generate a selectProfile action', () => {
    const profile = profiles[0];
    expect(actions.selectProfile({ profile }))
      .toEqual({
        type: actionTypes.SELECT_PROFILE,
        profileId: profile.id,
        profile,
      });
  });
  it('should generate a profile dropped action', () => {
    const props = { dragIndex: 1, hoverIndex: 0 };
    expect(actions.onDropProfile(props))
      .toEqual({
        type: actionTypes.PROFILE_DROPPED,
        dragIndex: props.dragIndex,
        hoverIndex: props.hoverIndex,
      });
  });

  it('should reorder profiles with PROFILE_DROPPED', () => {
    const dragIndex = 0;
    const hoverIndex = 1;
    const stateBefore = {
      ...initialState,
      profiles,
    };

    const profilesAfter = profiles.slice();
    [profilesAfter[dragIndex], profilesAfter[hoverIndex]] = [profilesAfter[hoverIndex], profilesAfter[dragIndex]];

    const stateAfter = {
      ...initialState,
      profiles: profilesAfter,
    };

    const action = {
      type: actionTypes.PROFILE_DROPPED,
      dragIndex,
      hoverIndex,
    };

    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
