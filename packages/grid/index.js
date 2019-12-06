// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
// load the presentational component
import { actions } from './reducer';
import GridPosts from './components/GridPosts';
import { getChannelProperties } from './util';

const orderPostLists = posts => {
  const postLists = [];
  const orderedPosts =
    posts && typeof posts === 'object'
      ? Object.values(posts).sort((a, b) => Number(b.due_at) - Number(a.due_at))
      : [];

  orderedPosts.forEach(post => {
    postLists.push(post);
  });

  return postLists;
};

export default connect(
  (state, ownProps) => {
    const { profileId } = ownProps;
    const currentProfile = state.grid.byProfileId[profileId];
    if (currentProfile) {
      const gridPosts = orderPostLists(currentProfile.gridPosts);
      const profile = state.profileSidebar.selectedProfile;
      return {
        loading: currentProfile.loading,
        page: currentProfile.page,
        gridPosts,
        total: gridPosts.length,
        isManager: profile.isManager,
        profile,
        isBusinessAccount: profile.business,
        isLockedProfile: state.profileSidebar.isLockedProfile,
        customLinksDetails: currentProfile.customLinksDetails,
        maxCustomLinks: currentProfile.maxCustomLinks,
        publicGridUrl: `https://shopgr.id/${profile.serviceUsername}`,
        hasCustomLinksFlip: state.appSidebar.user.features
          ? state.appSidebar.user.features.includes('shopgrid_links')
          : false,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onAddLinkClick: () => {
      dispatch(
        actions.handleAddGridLink({
          profileId: ownProps.profileId,
        })
      );
    },
    onImageClick: post => {
      dispatch(
        actions.handleImageClick({
          post: post.post,
          profileId: ownProps.profileId,
        })
      );
    },
    onImageClose: post => {
      dispatch(
        actions.handleImageClose({
          post: post.post,
          profileId: ownProps.profileId,
        })
      );
    },
    onChangePostUrl: (post, link) => {
      dispatch(
        actions.handleChangePostUrl({
          post,
          profileId: ownProps.profileId,
          link,
          oldLink: post.link,
        })
      );
    },
    onSavePostUrl: (post, link) => {
      dispatch(
        actions.handleSavePostUrl({
          post,
          profileId: ownProps.profileId,
          link,
        })
      );
    },
    handleCopyToClipboard: ({ copySuccess, publicGridUrl }) => {
      dispatch(
        actions.handleCopyToClipboardResult({
          copySuccess,
          publicGridUrl,
        })
      );
    },
    trackPagePreviewed: channel => {
      const metadata = getChannelProperties(channel);
      dispatch(
        analyticsActions.trackEvent('Shop Grid Page Previewed', metadata)
      );
    },
    onUpdateCustomLinks: ({ customLinks, linkText, linkUrl, item }) => {
      dispatch(
        actions.handleUpdateCustomLinks({
          profileId: ownProps.profileId,
          customLinks,
          customLinkColor: null,
          customLinkContrastColor: null,
          customLinkButtonType: null,
          linkText,
          linkUrl,
          item,
        })
      );
    },
    onUpdateCustomLinksColor: ({
      customLinkColor,
      customLinkContrastColor,
    }) => {
      dispatch(
        actions.handleUpdateCustomLinks({
          profileId: ownProps.profileId,
          customLinks: false,
          customLinkColor,
          customLinkContrastColor,
          customLinkButtonType: null,
        })
      );
    },
    onUpdateCustomLinksButtonType: ({ customLinkButtonType }) => {
      dispatch(
        actions.handleUpdateCustomLinks({
          profileId: ownProps.profileId,
          customLinks: false,
          customLinkColor: null,
          customLinkContrastColor: null,
          customLinkButtonType,
        })
      );
    },
    onDeleteCustomLink: ({ customLinkId }) => {
      dispatch(
        actions.handleDeleteCustomLink({
          profileId: ownProps.profileId,
          customLinkId,
        })
      );
    },
    onUpdateLinkText: ({ item, value }) => {
      dispatch(
        actions.handleEditCustomLinkText({
          profileId: ownProps.profileId,
          item,
          value,
          prop: 'text',
        })
      );
    },
    onSaveCustomLinkText: ({ item, value }) => {
      dispatch(
        actions.handleSaveCustomLink({
          profileId: ownProps.profileId,
          item,
        })
      );
    },
    onUpdateLinkUrl: ({ item, value }) => {
      dispatch(
        actions.handleEditCustomLinkUrl({
          profileId: ownProps.profileId,
          item,
          value,
          prop: 'url',
        })
      );
    },
    onToggleEditMode: ({ item, editing }) => {
      dispatch(
        actions.handleToggleEditMode({
          profileId: ownProps.profileId,
          item,
          editing,
        })
      );
    },
    onCancelCustomLinkEdit: ({ item }) => {
      dispatch(
        actions.handleOnCancelCustomLinkEdit({
          profileId: ownProps.profileId,
          item,
        })
      );
    },
    onSwapCustomLinks: ({ customLinkSource, customLinkTarget }) => {
      dispatch(
        actions.handleSwapCustomLinks({
          profileId: ownProps.profileId,
          customLinkSource,
          customLinkTarget,
        })
      );
    },
  })
)(GridPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
