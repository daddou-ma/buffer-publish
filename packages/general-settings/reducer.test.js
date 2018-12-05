import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      isInstagramBusiness: false,
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
      isInstagramBusiness: false,
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
        isInstagramBusiness: false,
        service: 'twitter',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should SHOW_GA_CUSTOMIZATION_FORM', () => {
    const stateAfter = {
      showGACustomizationForm: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
    };
    const action = {
      type: actionTypes.SHOW_GA_CUSTOMIZATION_FORM,
      profile: {
        showGACustomizationForm: true,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should toggle GA FETCH_SUCCESS action type', () => {
    const stateAfter = {
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
    };
    const action = {
      type: `toggleGoogleAnalytics_${actionTypes.FETCH_SUCCESS}`,
      profile: {
        googleAnalyticsEnabled: 'enabled',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
});
