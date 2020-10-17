import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import middleware from './middleware';
import { actions } from './reducer';

describe('middleware', () => {
  const state = {
    organizations: {
      selected: {
        id: '1234',
      },
    },
  };

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('generates profiles tab list when SELECT_PROFILE', () => {
    const getState = jest.fn(() => state);
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id',
      },
    };

    middleware({ dispatch, getState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.generateProfileTabs({
        profile: { id: 'id' },
        organization: { id: '1234' },
      })
    );
  });
});
