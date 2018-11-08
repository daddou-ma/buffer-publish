import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals';
import buffermetrics from '@bufferapp/buffermetrics/client';

import middleware from './middleware';
import { actionTypes } from './reducer';

jest.mock('@bufferapp/buffermetrics/client');

describe('middleware', () => {
  describe('should send tracking data', () => {
    const next = jest.fn();
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      upgradeModal: { source: 'source' },
      appSidebar: { user: { id: 'foo' } },
    }));

    test('when the modal opens', () => {
      const action = {
        type: modalsActionTypes.SHOW_UPGRADE_MODAL,
        source: 'source',
      };
      middleware({ dispatch, getState })(next)(action);

      expect(next)
        .toBeCalledWith(action);

      expect(buffermetrics.trackAction)
        .toBeCalledWith({
          application: 'PUBLISH',
          location: 'MODALS',
          action: 'show_upgrade_to_pro',
          metdata: { userId: 'foo', source: 'source' },
        });
    });

    test('when the modal closes', () => {
      const action = {
        type: modalsActionTypes.HIDE_UPGRADE_MODAL,
      };
      middleware({ dispatch, getState })(next)(action);

      expect(next)
        .toBeCalledWith(action);

      expect(buffermetrics.trackAction)
        .toBeCalledWith({
          application: 'PUBLISH',
          location: 'MODALS',
          action: 'hide_upgrade_to_pro',
          metdata: { userId: 'foo', source: 'source' },
        });
    });

    test('when the modal form is submitted', () => {
      const action = {
        type: actionTypes.UPGRADE,
      };
      middleware({ dispatch, getState })(next)(action);

      expect(next)
        .toBeCalledWith(action);

      expect(buffermetrics.trackAction)
        .toBeCalledWith({
          application: 'PUBLISH',
          location: 'MODALS',
          action: 'submit_upgrade_to_pro',
          metdata: { userId: 'foo', source: 'source' },
        });
    });
  });
});
