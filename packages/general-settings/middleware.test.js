import middleware from './middleware';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as generalSettingsActionTypes } from './reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

describe('middleware', () => {
  const dispatch = jest.fn();
  const next = jest.fn();

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should run getLinkShortener when profile selected', () => {
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'test',
      },
    };
    const postAction = {
      name: 'getLinkShortener',
      args: {
        profileId: 'test',
      },
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch(postAction));
  });



  it('should run toggleGoogleAnalytics when toggled', () => {
    const action = {
      type: generalSettingsActionTypes.TOGGLE_GOOGLE_ANALYTICS,
      profileId: 'test123',
      utmTrackingChoice: 'enabled',
    };
    const postAction = {
      name: 'toggleGoogleAnalytics',
      args: {
        profileId: action.profileId,
        utmTrackingChoice: action.utmTrackingChoice,
      },
    };

    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(dataFetchActions.fetch(postAction));
  });
});
