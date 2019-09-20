import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware/actions';
import middleware from './middleware';
import { actionTypes } from './reducer';

jest.mock('@bufferapp/publish-analytics-middleware/actions');

describe('middleware', () => {
  describe('should send tracking data when composer is opened', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      profileSidebar: { selectedProfile: {
          service: 'instagram',
          id: 123,
          serviceId: 1,
      }
    },
    }));

    test('when composer opens', () => {
      const action = {
        type: actionTypes.OPEN_STORIES_COMPOSER,
      };
      middleware({ dispatch, getState })(next)(action);

      expect(next)
        .toBeCalledWith(action);

      expect(analyticsActions.trackEvent)
        .toBeCalledWith('Story Composer Opened', getState().profileSidebar.selectedProfile);
    });
  });
});