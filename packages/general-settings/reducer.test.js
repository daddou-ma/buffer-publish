import deepFreeze from 'deep-freeze';
import reducer from './reducer';
import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      profileId: null,
      googleAnalyticsIsEnabled: false,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
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
      isInstagramProfile: false,
      isInstagramBusiness: false,
      profileId: '123',
      profileService: 'twitter',
      loadingLinkShorteners: true,
      selectedShortener: null,
      googleAnalyticsIsEnabled: false,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
    };
    const action = {
      type: actionTypes.SELECT_PROFILE,
      profileId: '123',
      profile: {
        isInstagramBusiness: false,
        service: 'twitter',
        directPostingEnabled: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should SHOW_GA_CUSTOMIZATION_FORM', () => {
    const stateAfter = {
      showGACustomizationForm: false,
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      remindersAreEnabled: false,
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
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
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

  it('should save GA Tracking settings', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
    };
    const action = {
      type: `saveGATrackingSettings_${dataFetchActionTypes.FETCH_SUCCESS}`,
      profile: {
        showGACustomizationForm: false,
        result: 'Okay, your Campaign tracking parameters have been updated.',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should get GA Tracking settings', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: true,
      utmCampaign: 'Campaign',
      utmSource: 'Source',
      utmMedium: 'Medium',
      remindersAreEnabled: false,
    };
    const action = {
      type: `getGATrackingSettings_${dataFetchActionTypes.FETCH_SUCCESS}`,
      profile: {
        showGACustomizationForm: true,
      },
      result: {
        trackingSettings: {
          utm_campaign: 'Campaign',
          utm_source: 'Source',
          utm_medium: 'Medium',
        },
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should set utm campaign value', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
    };
    const action = {
      type: actionTypes.SET_UTM_CAMPAIGN,
      profile: {
        showGACustomizationForm: true,
        utmCampaign: 'Campaign',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should set utm source value', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
    };
    const action = {
      type: actionTypes.SET_UTM_SOURCE,
      profile: {
        showGACustomizationForm: true,
        utmSource: 'Source',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should set utm medium value', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
    };
    const action = {
      type: actionTypes.SET_UTM_MEDIUM,
      profile: {
        showGACustomizationForm: true,
        utmMedium: 'Medium',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });
});
