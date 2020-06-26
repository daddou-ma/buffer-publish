import { actionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue';
import { actionTypes as gridActionTypes } from './reducer';
import { isValidURL, urlHasProtocol, getChannelProperties } from './util';

export default ({ getState, dispatch }) => next => action => {
  // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      if (action.profile.type && action.profile.type === 'instagram') {
        dispatch(
          dataFetchActions.fetch({
            name: 'gridPosts',
            args: {
              profileId: action.profile.id,
            },
          })
        );
      }
      break;

    case gridActionTypes.COPY_TO_CLIPBOARD_RESULT:
      if (action.copySuccess) {
        const channel = getState().profileSidebar.selectedProfile;
        const metadata = {
          ...getChannelProperties(channel),
          shopGridUrl: action.publicGridUrl || '',
        };
        dispatch(
          analyticsActions.trackEvent('Shop Grid Page Link Copied', metadata)
        );
        dispatch(
          notificationActions.createNotification({
            notificationType: 'success',
            message: 'Copied!',
          })
        );
      } else {
        dispatch(
          notificationActions.createNotification({
            notificationType: 'error',
            message: 'Error copying to your clipboard!',
          })
        );
      }
      break;

    case gridActionTypes.SAVE_POST_URL:
      if (action.link) {
        if (isValidURL(action.link)) {
          let { link } = action;
          if (!urlHasProtocol(action.link)) {
            link = `https://${link}`;
          }

          dispatch(
            dataFetchActions.fetch({
              name: 'updatePostLink',
              args: {
                updateId: action.updateId,
                link,
              },
            })
          );
        } else {
          dispatch(
            notificationActions.createNotification({
              notificationType: 'error',
              message: 'The URL format is invalid!',
            })
          );
        }
      } else {
        dispatch(
          dataFetchActions.fetch({
            name: 'updatePostLink',
            args: {
              updateId: action.updateId,
              link: action.link,
            },
          })
        );
      }
      break;

    case `updatePostLink_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.result && action.result.success) {
        const { updateId, link } = action.args;
        const channel = getState().profileSidebar.selectedProfile;
        const metadata = {
          ...getChannelProperties(channel),
          postId: updateId,
          url: link,
        };
        dispatch(
          analyticsActions.trackEvent('Shop Grid Post URL Updated', metadata)
        );
        dispatch(
          notificationActions.createNotification({
            notificationType: 'success',
            message: 'Nice! Your changes have been saved.',
          })
        );
      } else {
        dispatch(
          notificationActions.createNotification({
            notificationType: 'error',
            message: 'There was an error saving your changes!',
          })
        );
      }
      break;

    case `updatePostLink_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error saving your changes!',
        })
      );
      break;

    case gridActionTypes.SWAP_CUSTOM_LINKS: {
      const profile = getState().grid.byProfileId[action.profileId];
      const linkDetails = profile.customLinksDetails;

      dispatch(
        dataFetchActions.fetch({
          name: 'updateCustomLinks',
          args: {
            profileId: action.profileId,
            customLinks: linkDetails.customLinks || [],
            customLinkColor: null,
            customLinkContrastColor: null,
            customLinkButtonType: null,
          },
        })
      );
      break;
    }

    case gridActionTypes.UPDATE_SINGLE_CUSTOM_LINK: {
      dispatch(
        dataFetchActions.fetch({
          name: 'updateSingleCustomLink',
          args: {
            profileId: action.profileId,
            linkId: action.linkId,
            customLink: action.item,
          },
        })
      );
      break;
    }
    case gridActionTypes.UPDATE_CUSTOM_LINKS: {
      const profile = getState().grid.byProfileId[action.profileId];
      const linkDetails = profile.customLinksDetails;

      dispatch(
        dataFetchActions.fetch({
          name: 'updateCustomLinks',
          args: {
            profileId: action.profileId,
            customLinks: linkDetails.customLinks || [],
            customLinkColor: action.customLinkColor,
            customLinkContrastColor: action.customLinkContrastColor,
            customLinkButtonType: action.customLinkButtonType,
          },
        })
      );
      break;
    }
    case gridActionTypes.ADD_NEW_CUSTOM_LINK: {
      const profile = getState().grid.byProfileId[action.profileId];
      const linkDetails = profile.customLinksDetails;

      dispatch(
        dataFetchActions.fetch({
          name: 'updateCustomLinks',
          args: {
            profileId: action.profileId,
            customLinks: linkDetails.customLinks || [],
            customLinkColor: action.customLinkColor,
            customLinkContrastColor: action.customLinkContrastColor,
            customLinkButtonType: action.customLinkButtonType,
          },
        })
      );
      break;
    }

    case `updateSingleCustomLink_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `updateCustomLinks_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch({
        type: 'INIT_SINGLE_PROFILE',
        profileId: action.args.profileId,
      });
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Nice! Your changes have been saved.',
        })
      );
      break;

    case `updateCustomLinks_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error saving your changes!',
        })
      );
      break;

    case gridActionTypes.DELETE_CUSTOM_LINK:
      if (action.customLinkId) {
        dispatch(
          dataFetchActions.fetch({
            name: 'deleteCustomLink',
            args: {
              profileId: action.profileId,
              customLinkId: action.customLinkId,
            },
          })
        );
      }
      break;

    case `deleteCustomLink_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Nice! Your changes have been saved.',
        })
      );
      break;

    case `deleteCustomLink_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error saving your changes!',
        })
      );
      break;

    /**
     * Watch for Pusher events to reload the grid as necessary
     * - when posts are created, deleted, or edited (they could
     * have changed the image).
     *
     * In the future it might be nicer to just update the post in
     * place rather than refetching all gridPosts.
     */
    case queueActionTypes.POST_CREATED:
    case queueActionTypes.POST_DELETED:
    case queueActionTypes.POST_UPDATED: {
      const { profileId } = action;
      const {
        profileSidebar: { profiles },
      } = getState();
      const profile = profiles.find(p => p.id === profileId);
      if (profile && profile.type === 'instagram') {
        dispatch(
          dataFetchActions.fetch({
            name: 'gridPosts',
            args: {
              profileId,
            },
          })
        );
      }
      break;
    }

    default:
      break;
  }
};
