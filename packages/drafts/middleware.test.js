import { actionTypes as notificationActionTypes } from '@bufferapp/notifications';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';
import middleware from './middleware';

describe('middleware', () => {
  const next = jest.fn();
  const dispatch = jest.fn();

  it('should export middleware', () => {
    expect(middleware)
      .toBeDefined();
  });

  it('should fetch draftPosts', () => {
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        id: 'id1',
      },
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'draftPosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
        },
      }));
  });

  it('should fetch deletePost', () => {
    const action = {
      type: actionTypes.DRAFT_CONFIRMED_DELETE,
      updateId: 'updateId1',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'deletePost',
        args: {
          updateId: action.updateId,
        },
      }));
  });

  it('should fetch approveDraft', () => {
    const action = {
      type: actionTypes.DRAFT_APPROVE,
      updateId: 'updateId1',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'approveDraft',
        args: {
          updateId: action.updateId,
        },
      }));
  });

  it('should fetch changeDraftStatus', () => {
    const action = {
      type: actionTypes.DRAFT_NEEDS_APPROVAL,
      needsApproval: true,
      updateId: 'updateId1',
    };
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(dataFetchActions.fetch({
        name: 'changeDraftStatus',
        args: {
          updateId: action.updateId,
          needsApproval: action.needsApproval,
        },
      }));
  });

  it('should trigger a notification if draft is successfully approved', () => {
    const RPC_NAME = 'approveDraft';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: 'We\'ve added this draft to your queue!',
      }));
  });

  it('should trigger a notification if draft is successfully moved', () => {
    const RPC_NAME = 'changeDraftStatus';
    const action = dataFetchActions.fetchSuccess({
      name: RPC_NAME,
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'success',
        message: 'We\'ve successfully moved this draft!',
      }));
  });

  it('should trigger a notification if there is an error approving the draft', () => {
    const RPC_NAME = 'approveDraft';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: 'There was an error adding this draft to your queue!',
      }));
  });

  it('should trigger a notification if there is an error moving the draft', () => {
    const RPC_NAME = 'changeDraftStatus';
    const action = dataFetchActions.fetchFail({
      name: RPC_NAME,
    });
    middleware({ dispatch })(next)(action);
    expect(next)
      .toBeCalledWith(action);
    expect(dispatch)
      .toBeCalledWith(expect.objectContaining({
        type: notificationActionTypes.CREATE_NOTIFICATION,
        notificationType: 'error',
        message: 'There was an error moving this draft!',
      }));
  });
});
