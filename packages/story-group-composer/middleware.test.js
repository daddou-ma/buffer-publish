import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { getSGTrackingData, getNoteTrackingData } from './utils/Tracking';
import { actionTypes } from './reducer';
import middleware from './middleware';

jest.mock('@bufferapp/publish-analytics-middleware');

describe('middleware', () => {
  describe('story group composer tracking', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      profileSidebar: {
        selectedProfile: {
          type: 'instagram',
          serviceId: '123',
        },
      },
      storyGroupComposer: {
        storyGroup: { stories: [{ note: null, order: 1 }], id: '123' },
      },
    }));
    const storyGroup = {
      storyDetails: {
        stories: [],
        id: '123',
        profileId: '123',
        scheduled_at: '29838471',
      },
    };
    it('should send tracking data when story group is created', () => {
      const action = {
        type: `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: { storyGroup },
      };
      const expectedObj = getSGTrackingData({
        storyGroup,
        channel: getState().profileSidebar.selectedProfile,
        cta: SEGMENT_NAMES.STORIES_CREATE_STORY_GROUP,
      });

      middleware({ dispatch, getState })(next)(action);

      expect(next).toBeCalledWith(action);

      expect(analyticsActions.trackEvent).toBeCalledWith(
        'Story Group Created',
        expectedObj
      );
    });
    it('should send tracking data when story group is updated', () => {
      const action = {
        type: `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`,
        result: { storyGroup },
      };
      const expectedObj = getSGTrackingData({
        storyGroup,
        channel: getState().profileSidebar.selectedProfile,
        cta: SEGMENT_NAMES.STORIES_UPDATE_STORY_GROUP,
      });

      middleware({ dispatch, getState })(next)(action);

      expect(next).toBeCalledWith(action);

      expect(analyticsActions.trackEvent).toBeCalledWith(
        'Story Group Updated',
        expectedObj
      );
    });
    it('should send tracking data when note is added', () => {
      const action = {
        type: actionTypes.TRACK_NOTE,
        order: 1,
        note: 'hello',
        cta: SEGMENT_NAMES.STORIES_COMPOSER_ADD_NOTE,
      };
      const expectedObj = getNoteTrackingData({
        storyGroupId: '123',
        note: action.note,
        channel: getState().profileSidebar.selectedProfile,
        cta: SEGMENT_NAMES.STORIES_COMPOSER_ADD_NOTE,
      });

      middleware({ dispatch, getState })(next)(action);

      expect(next).toBeCalledWith(action);

      expect(analyticsActions.trackEvent).toBeCalledWith(
        'Story Note Added',
        expectedObj
      );
    });
  });
});
