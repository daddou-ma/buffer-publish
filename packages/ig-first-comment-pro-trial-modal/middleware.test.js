import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals';
import { trackAction } from '@bufferapp/publish-data-tracking';
import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import middleware from './middleware';
import { actionTypes } from './reducer';

jest.mock('@bufferapp/publish-data-tracking');

describe('ig first comment pro trial modal middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();

  describe('should send tracking data', () => {
    test('when the modal opens', () => {
      const action = {
        type: modalsActionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL,
        source: 'ig_first_comment_toggle',
      };
      middleware({ dispatch })(next)(action);

      expect(next).toBeCalledWith(action);

      expect(trackAction).toBeCalledWith({
        location: 'MODALS',
        action: 'show_start_pro_trial',
        metadata: { source: 'ig_first_comment_toggle' },
      });
    });

    test('when the modal closes', () => {
      const action = {
        type: modalsActionTypes.HIDE_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL,
      };
      middleware({ dispatch })(next)(action);

      expect(next).toBeCalledWith(action);

      expect(trackAction).toBeCalledWith({
        location: 'MODALS',
        action: 'hide_start_pro_trial',
        metadata: { source: 'ig_first_comment_toggle' },
      });
    });

    test('when start pro trial button is clicked', () => {
      const action = {
        type: actionTypes.IG_FIRST_COMMENT_PRO_TRIAL,
        source: 'ig_first_comment',
      };
      middleware({ dispatch })(next)(action);

      expect(next).toBeCalledWith(action);

      expect(trackAction).toBeCalledWith({
        location: 'MODALS',
        action: 'start_pro_trial',
        metadata: { source: 'ig_first_comment_toggle' },
      });
    });
  });
});
