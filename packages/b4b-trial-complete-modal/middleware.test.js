import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals';
import { trackAction } from '@bufferapp/publish-data-tracking';

import middleware from './middleware';
import { actionTypes } from './reducer';

jest.mock('@bufferapp/publish-data-tracking');

describe('middleware', () => {
  describe('should send tracking data when trial is complete', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      b4bTrialComplete: { source: 'source' },
    }));

    test('when the trial is cancelled', () => {
      const action = {
        type: actionTypes.CANCEL_TRIAL,
        source: 'source',
      };
      middleware({ dispatch, getState })(next)(action);

      expect(next)
        .toBeCalledWith(action);

      expect(trackAction)
        .toBeCalledWith({
          location: 'MODALS',
          action: 'cancel_expired_b4b_trial',
          metadata: { source: 'source' },
        });
    });
  });
});
