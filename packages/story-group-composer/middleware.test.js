import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import getSGTrackingData from './utils/Tracking';
import middleware from './middleware';

jest.mock('@bufferapp/publish-analytics-middleware');

describe('middleware', () => {
  describe('story group composer tracking', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      profileSidebar: {
        selectedProfile: {
          type: 'instagram', serviceId: '123',
        },
      },
    }));

    it('should send tracking data when story group is created', () => {
      const storyGroup = {
        storyDetails: {
          stories: [],
          id: '123',
          profileId: '123',
          scheduled_at: '29838471',
        },
      };
      const action = {
        type: `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: { storyGroup },
      };
      const expectedObj = getCreateSGTrackingData({
        storyGroup,
        channel: getState().profileSidebar.selectedProfile,
      });

      middleware({ dispatch, getState })(next)(action);

      expect(next)
        .toBeCalledWith(action);

      expect(analyticsActions.trackEvent)
        .toBeCalledWith('Story Created', expectedObj);
    });
  });
});
