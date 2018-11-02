import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import { actionTypes } from '@bufferapp/publish-profile-sidebar';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      directPostingEnabled: false,
      profileId: null,
      googleAnalyticsIsEnabled: false,
      showGACustomizationForm: false,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle SELECT_PROFILE action type', () => {
    const stateAfter = {
      directPostingEnabled: false,
      profileId: '123',
      profileService: 'twitter',
      loadingLinkShorteners: true,
      selectedShortener: null,
      googleAnalyticsIsEnabled: false,
      showGACustomizationForm: false,
    };
    const action = {
      type: actionTypes.SELECT_PROFILE,
      profileId: '123',
      profile: {
        directPostingEnabled: false,
        service: 'twitter',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
});
