import { actionTypes as tabsActionTypes } from '@bufferapp/publish-tabs';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware/actions';
import { getProfilePageParams } from '@bufferapp/publish-routes';

import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications/lib/reducer';
import { actionTypes } from './reducer';

const getTrackingData = ({ post = {}, channel = {} }) => ({
  channel: channel.service || null,
  channelId: channel.id || null,
  channelType: channel.service_type || null,
  channelServiceId: channel.serviceId || null,
  postId: post.id || null,
  mediaType: post.type || null,
});

export default ({ dispatch, getState }) => next => action => {
  next(action);
  const state = getState();
  const path = getState().router.location.pathname;
  const { tabId } = getProfilePageParams({ path }) || {};
  const needsApproval =
    tabId === 'awaitingApproval' || tabId === 'pendingApproval';
  const isDraft =
    ['awaitingApproval', 'pendingApproval', 'drafts'].indexOf(action.tabId) !==
    -1;

  switch (action.type) {
    case tabsActionTypes.SELECT_TAB:
      if (isDraft) {
        dispatch(
          dataFetchActions.fetch({
            name: 'draftPosts',
            args: {
              profileId: action.profileId,
              isFetchingMore: false,
              needsApproval,
              clear: true,
            },
          })
        );
      }
      break;
    case actionTypes.DRAFT_CONFIRMED_DELETE: {
      dispatch(
        dataFetchActions.fetch({
          name: 'deletePost',
          args: {
            updateId: action.updateId,
          },
        })
      );
      const channel = state.profileSidebar.selectedProfile;
      const metadata = getTrackingData({ post: action.draft, channel });
      dispatch(analyticsActions.trackEvent('Draft Deleted', metadata));
      break;
    }
    /*
    In Classic it's REQUESTING_DRAFT_APPROVE.
    Sends draft to queue, which means approves draft
    */
    case actionTypes.DRAFT_APPROVE:
      dispatch(
        dataFetchActions.fetch({
          name: 'approveDraft',
          args: {
            updateId: action.updateId,
          },
        })
      );
      break;
    /*
    In Classic it's REQUESTING_NEEDS_APPROVAL_UPDATE:
    Requests approval as a contributor (moves draft to awaiting approval tab if needsApproval is true,
    moves from approval tab to drafts if needsApproval false)
    */
    case actionTypes.DRAFT_NEEDS_APPROVAL:
      dispatch(
        dataFetchActions.fetch({
          name: 'changeDraftStatus',
          args: {
            updateId: action.updateId,
            needsApproval: action.needsApproval,
          },
        })
      );
      break;
    case `approveDraft_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: "We've added this draft to your queue!",
        })
      );
      const post = action.result.update;
      const channel = state.profileSidebar.selectedProfile;
      const metadata = getTrackingData({ post, channel });
      dispatch(analyticsActions.trackEvent('Draft Approved', metadata));
      break;
    }
    case `changeDraftStatus_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: "We've successfully moved this draft!",
        })
      );
      const draft = action.result ? action.result.draft : {};
      /* this is also called when a draft in approval is moved back into drafts, which
       is why we need to check the needs_approval bool */
      const channel = state.profileSidebar.selectedProfile;
      const metadata = getTrackingData({ post: draft, channel });
      const eventName = draft.needs_approval
        ? 'Draft Submitted'
        : 'Draft Rejected';
      dispatch(analyticsActions.trackEvent(eventName, metadata));
      break;
    }
    case `approveDraft_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error adding this draft to your queue!',
        })
      );
      break;
    case `changeDraftStatus_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error moving this draft!',
        })
      );
      break;
    default:
      break;
  }
};
