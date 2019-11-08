import { push } from 'connected-react-router';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';
import middleware from './middleware';
import { actionTypes, actions } from './reducer';

describe('middleware', () => {
  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });

  it('navigates to generateProfilePageRoute when SELECT_TAB', () => {
    const fakeState = () => ({
      tabId: 'queue',
      profileId: 'id',
    });
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: actionTypes.SELECT_TAB,
      tabId: 'drafts',
      profileId: 'id',
    };

    middleware({ dispatch, getState: fakeState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      push(
        generateProfilePageRoute({
          profileId: 'id',
          tabId: 'drafts',
        })
      )
    );
  });

  it('updates drafts counter when DRAFT_CREATED', () => {
    const fakeState = () => ({
      profileSidebar: {
        selectedProfileId: 'id',
      },
    });
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: draftActionTypes.DRAFT_CREATED,
      draft: {
        needsApproval: false,
      },
      profileId: 'id',
    };

    middleware({ dispatch, getState: fakeState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.updateDraftCounter({
        needsApproval: false,
        draftAction: 'DRAFTS__DRAFT_CREATED',
      })
    );
  });

  it('updates drafts counter when DRAFT_DELETED', () => {
    const fakeState = () => ({
      profileSidebar: {
        selectedProfileId: 'id',
      },
    });
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: draftActionTypes.DRAFT_DELETED,
      draft: {
        needsApproval: false,
      },
      profileId: 'id',
    };

    middleware({ dispatch, getState: fakeState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.updateDraftCounter({
        needsApproval: false,
        draftAction: 'DRAFTS__DRAFT_DELETED',
      })
    );
  });

  it('updates drafts counter when DRAFT_APPROVED', () => {
    const fakeState = () => ({
      profileSidebar: {
        selectedProfileId: 'id',
      },
    });
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: draftActionTypes.DRAFT_APPROVED,
      draft: {
        needsApproval: true,
      },
      profileId: 'id',
    };

    middleware({ dispatch, getState: fakeState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.updateDraftCounter({
        needsApproval: true,
        draftAction: 'DRAFTS__DRAFT_APPROVED',
      })
    );
  });

  it('updates drafts counter when DRAFT_MOVED', () => {
    const fakeState = () => ({
      profileSidebar: {
        selectedProfileId: 'id',
      },
    });
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: draftActionTypes.DRAFT_MOVED,
      draft: {
        needsApproval: false,
      },
      profileId: 'id',
    };

    middleware({ dispatch, getState: fakeState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).toBeCalledWith(
      actions.updateDraftCounter({
        needsApproval: false,
        draftAction: 'DRAFTS__DRAFT_MOVED',
      })
    );
  });

  it('does not update drafts counter if draft profile Id is not the same as the selected profile', () => {
    const fakeState = () => ({
      profileSidebar: {
        selectedProfileId: 'id1',
      },
    });
    const dispatch = jest.fn();
    const next = jest.fn();

    const action = {
      type: draftActionTypes.DRAFT_CREATED,
      draft: {
        needsApproval: false,
      },
      profileId: 'id',
    };

    middleware({ dispatch, getState: fakeState })(next)(action);
    expect(next).toBeCalledWith(action);
    expect(dispatch).not.toBeCalledWith(
      actions.updateDraftCounter({
        needsApproval: false,
        draftAction: 'DRAFTS__DRAFT_CREATED',
      })
    );
  });
});
