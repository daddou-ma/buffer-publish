import { AppEnvironments } from '@bufferapp/publish-constants';
import { ActionTypes } from '../AppConstants';
import { rawProfilesData, fakeMetaData } from './stubData';

jest.dontMock('../stores/AppStore');

describe('AppStore', () => {
  let AppDispatcher;
  let AppStore;

  const actionAddProfiles = {
    action: {
      actionType: ActionTypes.COMPOSER_CREATE_PROFILES,
      profilesData: rawProfilesData,
    },
  };

  const actionSelectFirstProfile = {
    action: {
      actionType: ActionTypes.COMPOSER_SELECT_PROFILE,
      id: '59c420f583768201008b456b',
    },
  };

  const actionSelectSecondProfile = {
    action: {
      actionType: ActionTypes.COMPOSER_SELECT_PROFILE,
      id: '59cd5270b7ca102c007b23c6',
    },
  };
  const actionSetMetaData = {
    action: {
      actionType: ActionTypes.APP_RECEIVE_METADATA,
      metaData: fakeMetaData,
    },
  };

  beforeEach(() => {
    // need to recreate the dispatcher & store here each time
    AppDispatcher = require('../dispatcher'); //eslint-disable-line
    AppStore = require('../stores/AppStore'); //eslint-disable-line
  });

  it('only allows one twitter profile to be selected at a time', () => {
    AppDispatcher.default.dispatch(actionSetMetaData);
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectFirstProfile);
    AppDispatcher.default.dispatch(actionSelectSecondProfile);
    const selectedTwitterProfiles = AppStore.default.getSelectedProfilesForService(
      'twitter'
    );
    expect(selectedTwitterProfiles.length).toEqual(1);
  });

  describe('isExtension', () => {
    it('returns true if the current enviroment is the extension', () => {
      AppDispatcher.default.dispatch({
        action: {
          actionType: ActionTypes.APP_RECEIVE_METADATA,
          metaData: {
            appEnvironment: AppEnvironments.EXTENSION,
          },
        },
      });
      expect(AppStore.default.isExtension()).toBeTruthy();
    });

    it('returns false otherwise', () => {
      AppDispatcher.default.dispatch(actionSetMetaData);
      expect(AppStore.default.isExtension()).toBeFalsy();
    });
  });
});
