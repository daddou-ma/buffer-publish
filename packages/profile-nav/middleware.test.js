import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import middleware from './middleware';
import { actions } from './reducer';

describe('middleware', () => {
  const state = {
    organizations: {
      selected: {
        id: '1234',
      },
    },
    profileSidebar: {
      selectedProfile: {
        id: 'id',
      },
    },
  };

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('generates profiles tab list when the profile is selected and org selected data is available', () => {
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

  it('does not generate profiles tab list when the profile is selected but org selected data is not available', () => {
    const dispatch = jest.fn();
    const next = jest.fn();

    const getStateNoOrganization = () => ({
      organizations: {},
    });

    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id',
      },
    };

    middleware({ dispatch, getState: getStateNoOrganization })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).not.toBeCalledWith(
      actions.generateProfileTabs({
        profile: { id: 'id' },
        organization: { id: '1234' },
      })
    );
  });

  it('generates profiles tab list when the org is selected and profile selected data is available', () => {
    const getState = jest.fn(() => state);
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: orgActionTypes.ORGANIZATION_SELECTED,
      selected: {
        id: '1234',
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

  it('does not generate profiles tab list when the org is selected but profile selected data is not available', () => {
    const dispatch = jest.fn();
    const next = jest.fn();

    const getStateNoProfile = () => ({
      profileSidebar: {
        selectedProfile: {},
      },
    });

    const action = {
      type: orgActionTypes.ORGANIZATION_SELECTED,
      selected: {
        id: '1234',
      },
    };

    middleware({ dispatch, getState: getStateNoProfile })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).not.toBeCalledWith(
      actions.generateProfileTabs({
        profile: { id: 'id' },
        organization: { id: '1234' },
      })
    );
  });
});
