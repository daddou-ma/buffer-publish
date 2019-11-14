// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { CLIENT_NAME } from '@bufferapp/publish-constants';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
// load the presentational component
import { actions } from './reducer';
import GridPosts from './components/GridPosts';
import { getChannelProperties } from './util';

const orderPostLists = (posts) => {
  const postLists = [];
  const orderedPosts = (posts && typeof posts === 'object') ?
    Object.values(posts).sort((a, b) => Number(b.due_at) - Number(a.due_at)) : [];

  orderedPosts.forEach((post) => {
    postLists.push(post);
  });

  return postLists;
};

export default connect(
  (state, ownProps) => {
    const profileId = ownProps.profileId;
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
        publicGridUrl: `https://shopgr.id/${profile.serviceUsername}`,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onImageClick: (post) => {
      dispatch(actions.handleImageClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClose: (post) => {
      dispatch(actions.handleImageClose({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onChangePostUrl: (post, link) => {
      dispatch(actions.handleChangePostUrl({
        post,
        profileId: ownProps.profileId,
        link,
        oldLink: post.link,
      }));
    },
    onSavePostUrl: (post, link) => {
      dispatch(actions.handleSavePostUrl({
        post,
        profileId: ownProps.profileId,
        link,
      }));
    },
    handleCopyToClipboard: ({ copySuccess, publicGridUrl }) => {
      dispatch(actions.handleCopyToClipboardResult({
        copySuccess,
        publicGridUrl,
      }));
    },
    trackPagePreviewed: channel => {
      const metadata = {
        ...getChannelProperties(channel),
        clientName: CLIENT_NAME,
      };
      dispatch(
        analyticsActions.trackEvent('Shop Grid Page Previewed', metadata)
      );
    },
  })
)(GridPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
