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
      const mergedPosts = orderPostLists(currentProfile.mergedPosts);
      return {
        header: currentProfile.header,
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        mergedPosts,
        pendingPosts: currentProfile.pendingPosts,
        servicePosts: currentProfile.servicePosts,
        total: mergedPosts.length,
        isManager: state.profileSidebar.selectedProfile.isManager,
        isBusinessAccount: state.profileSidebar.selectedProfile.business,
        isLockedProfile: state.profileSidebar.isLockedProfile,
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
    onChangePostUrl: (post) => {
      dispatch(actions.handleChangePostUrl({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
  }),
)(GridPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
