import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import middleware from './middleware';
import { actionTypes } from './reducer';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();

  it('fetches cancelTrial and hides modal when CANCEL_TRIAL', () => {
    const action = {
      type: actionTypes.CANCEL_TRIAL,
    };
    middleware({ dispatch })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      dataFetchActions.fetch({
        name: 'cancelTrial',
      })
    );
    expect(dispatch).toBeCalledWith(modalsActions.hideTrialCompleteModal());
  });
});
