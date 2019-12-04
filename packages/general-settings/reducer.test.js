import deepFreeze from 'deep-freeze';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import reducer, { actionTypes } from './reducer';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      profileId: null,
      googleAnalyticsIsEnabled: false,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
      showModal: false,
    };
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
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
      showModal: false,
      profileName: 'buffer123',
      avatarUrl:
        'https://pbs.twimg.com/profile_images/901516345476603904/e2F5vE32_normal.jpg',
      loadingShuffle: false,
    };
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profileId: '123',
      profile: {
        isInstagramBusiness: false,
        service: 'twitter',
        directPostingEnabled: true,
        serviceUsername: 'buffer123',
        avatarUrl:
          'https://pbs.twimg.com/profile_images/901516345476603904/e2F5vE32_normal.jpg',
        loadingShuffle: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should SHOW_GA_CUSTOMIZATION_FORM', () => {
    const stateAfter = {
      showGACustomizationForm: false,
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      remindersAreEnabled: false,
      profileId: null,
      showModal: false,
    };
    const action = {
      type: profileActionTypes.SHOW_GA_CUSTOMIZATION_FORM,
      profile: {
        showGACustomizationForm: true,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should toggle GA FETCH_SUCCESS action type', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
      showModal: false,
    };
    const action = {
      type: `toggleGoogleAnalytics_${profileActionTypes.FETCH_SUCCESS}`,
      profile: {
        googleAnalyticsEnabled: 'enabled',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should save GA Tracking settings', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
      showModal: false,
    };
    const action = {
      type: `saveGATrackingSettings_${dataFetchActionTypes.FETCH_SUCCESS}`,
      profile: {
        showGACustomizationForm: false,
        result: 'Okay, your Campaign tracking parameters have been updated.',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
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
      showModal: false,
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
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should set utm campaign value', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
      showModal: false,
    };
    const action = {
      type: profileActionTypes.SET_UTM_CAMPAIGN,
      profile: {
        showGACustomizationForm: true,
        utmCampaign: 'Campaign',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should set utm source value', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
      showModal: false,
    };
    const action = {
      type: profileActionTypes.SET_UTM_SOURCE,
      profile: {
        showGACustomizationForm: true,
        utmSource: 'Source',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should set utm medium value', () => {
    const stateAfter = {
      isInstagramProfile: false,
      isInstagramBusiness: false,
      googleAnalyticsIsEnabled: false,
      profileId: null,
      showGACustomizationForm: false,
      remindersAreEnabled: false,
      showModal: false,
    };
    const action = {
      type: profileActionTypes.SET_UTM_MEDIUM,
      profile: {
        showGACustomizationForm: true,
        utmMedium: 'Medium',
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });
  it('should set loading to false when fetch is success', () => {
    const action = {
      type: `shuffleQueue_${dataFetchActionTypes.FETCH_SUCCESS}`,
    };
    const { loadingShuffle } = reducer(undefined, action);
    expect(loadingShuffle).toBe(false);
  });
  it('should set showModal to false when fetch is success', () => {
    const action = {
      type: `shuffleQueue_${dataFetchActionTypes.FETCH_SUCCESS}`,
    };
    const { showModal } = reducer(undefined, action);
    expect(showModal).toBe(false);
  });
  it('should set showModal to true when user clicks shuffle queue', () => {
    const action = {
      type: actionTypes.SHUFFLE_QUEUE,
    };
    const { showModal } = reducer(undefined, action);
    expect(showModal).toBe(true);
  });
  it('should set loading to true when user clicks shuffle queue', () => {
    const action = {
      type: actionTypes.CONFIRM_SHUFFLE_QUEUE,
    };
    const { loadingShuffle } = reducer(undefined, action);
    expect(loadingShuffle).toBe(true);
  });
  it('should close confirm modal', () => {
    const action = {
      type: actionTypes.CLOSE_MODAL,
    };
    const { showModal } = reducer(undefined, action);
    expect(showModal).toBe(false);
  });
});
