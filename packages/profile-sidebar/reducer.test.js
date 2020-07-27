import deepFreeze from 'deep-freeze';

import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as queueActions } from '@bufferapp/publish-queue/reducer';
import reducer, {
  actions,
  actionTypes,
  initialState as profileInitialState,
} from './reducer';
import { profiles } from './mockData/profiles';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      profiles: [],
      loading: false,
      selectedProfileId: '',
      userId: null,
      selectedProfile: {},
      isBusinessAccount: false,
      isLockedProfile: false,
      hasInstagram: true,
      hasFacebook: true,
      hasTwitter: true,
      isSearchPopupVisible: false,
      searchText: null,
      isOrganizationSwitcherEnabled: false,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should generate a selectProfile action', () => {
    const profile = profiles[0];
    expect(actions.selectProfile({ profile })).toEqual({
      type: actionTypes.SELECT_PROFILE,
      profileId: profile.id,
      profile,
    });
  });

  it('should generate a profile dropped action', () => {
    const props = { dragIndex: 1, hoverIndex: 0 };
    expect(actions.onDropProfile(props)).toEqual({
      type: actionTypes.PROFILE_DROPPED,
      dragIndex: props.dragIndex,
      hoverIndex: props.hoverIndex,
    });
  });

  it('should reorder profiles with PROFILE_DROPPED', () => {
    const dragIndex = 0;
    const hoverIndex = 1;
    const stateBefore = {
      ...profileInitialState,
      profiles,
    };

    const profilesAfter = profiles.slice();
    [profilesAfter[dragIndex], profilesAfter[hoverIndex]] = [
      profilesAfter[hoverIndex],
      profilesAfter[dragIndex],
    ];

    const stateAfter = {
      ...profileInitialState,
      profiles: profilesAfter,
    };

    const action = {
      type: actionTypes.PROFILE_DROPPED,
      dragIndex,
      hoverIndex,
    };

    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should set loading to true when it begins the fetch', () => {
    const action = {
      type: `profiles_${dataFetchActionTypes.FETCH_START}`,
    };
    const { loading } = reducer(undefined, action);
    expect(loading).toBe(true);
  });

  it('should load all profiles', () => {
    const action = {
      type: `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: profiles,
    };
    const { profiles: profilesInStore } = reducer(undefined, action);
    expect(profilesInStore).toEqual(profiles);
  });

  it('should correctly set flags for connected accounts', () => {
    const action = {
      type: `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`,
      result: profiles,
    };
    const { hasInstagram, hasFacebook, hasTwitter } = reducer(
      undefined,
      action
    );
    expect(hasInstagram).toBe(false);
    expect(hasFacebook).toBe(true);
    expect(hasTwitter).toBe(true);
  });

  describe('profiles', () => {
    let initialState;
    beforeEach(() => {
      // load some profiles into the state for each of the tests here
      const action = {
        type: `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: profiles,
      };
      initialState = reducer(undefined, action);
    });
    it('should update the selectedProfileId when a new profile is selected', () => {
      const action = actions.selectProfile({ profile: profiles[1] });
      const { selectedProfileId } = reducer(initialState, action);
      expect(selectedProfileId).toBe(profiles[1].id);
    });
    it('should update the selectedProfile when a new profile is selected', () => {
      const action = actions.selectProfile({ profile: profiles[1] });
      const { selectedProfile } = reducer(initialState, action);
      expect(selectedProfile).toEqual(profiles[1]);
    });
    it('should update the profiles open state when a new profile is selected', () => {
      const action = actions.selectProfile({ profile: profiles[0] });
      const { profiles: profilesWithOpen } = reducer(initialState, action);
      expect(profilesWithOpen[0].open).toBe(true);
    });
    it('should update the isLockedProfile when a new profile is selected', () => {
      const action = actions.selectProfile({ profile: profiles[1] });
      const { isLockedProfile } = reducer(initialState, action);
      expect(isLockedProfile).toBe(true);
    });
    it('should update the profile paused state', () => {
      const pauseAction = actions.onPauseClick({ profileId: profiles[0].id });
      const unpauseAction = actions.onUnpauseClick({
        profileId: profiles[0].id,
      });

      const stateWithPausedProfile = reducer(initialState, pauseAction);
      expect(stateWithPausedProfile.profiles[0].paused).toBe(true);

      const stateWithUnpausedProfile = reducer(
        stateWithPausedProfile,
        unpauseAction
      );
      expect(stateWithUnpausedProfile.profiles[0].paused).toBe(false);
    });
    it('should update the profile post count', () => {
      const action = queueActions.postCountUpdated(profiles[0].id, {
        pending: 5,
        sent: 2,
      });
      const { profiles: profilesWithUpdatedPostCounts } = reducer(
        initialState,
        action
      );
      expect(profilesWithUpdatedPostCounts[0].pendingCount).toBe(5);
      expect(profilesWithUpdatedPostCounts[0].sentCount).toBe(2);
    });

    it("should extract properties from user when it's fetched", () => {
      const stateBefore = profileInitialState;

      const stateAfter = {
        ...profileInitialState,
        userId: '1234',
        isFreeUser: false,
        isOrganizationSwitcherEnabled: false,
      };

      const action = {
        type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: {
          id: stateAfter.userId,
          isFreeUser: stateAfter.isFreeUser,
          hasOrgSwitcherFeature: false,
        },
      };

      deepFreeze(action);
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });

    it('should change isOrganizationSwitcherEnabled to true when feature is enabled and user fetched', () => {
      const stateBefore = profileInitialState;

      const stateAfter = {
        ...profileInitialState,
        userId: '1234',
        isFreeUser: false,
        isOrganizationSwitcherEnabled: true,
      };

      const action = {
        type: `user_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: {
          id: stateAfter.userId,
          isFreeUser: stateAfter.isFreeUser,
          hasOrgSwitcherFeature: true,
        },
      };

      deepFreeze(action);
      expect(reducer(stateBefore, action)).toEqual(stateAfter);
    });
  });
});
