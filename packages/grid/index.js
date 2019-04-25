// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
// load the presentational component
import { actions } from './reducer';
import GridPosts from './components/GridPosts';

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
        generatedUrl: currentProfile.shortUrl,
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
    handleCopyToClipboard: (copySuccess) => {
      dispatch(actions.handleCopyToClipboardResult({
        copySuccess,
      }));
    },
  }),
)(GridPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
