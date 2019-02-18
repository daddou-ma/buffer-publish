// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
// load the presentational component
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import PastRemindersList from './components/PastRemindersList';

const formatPostLists = (posts) => {
  const postLists = [];
  let day;
  let newList;
  const orderedPosts = (posts && typeof posts === 'object') ?
    Object.values(posts).sort((a, b) => b.due_at - a.due_at) : [];

  orderedPosts.forEach((post) => {
    if (post.day !== day) {
      day = post.day;
      newList = { listHeader: day, posts: [post] };
      postLists.push(newList);
    } else { // if same day add to posts array of current list
      newList.posts.push(post);
    }
  });
  return postLists;
};

// default export = container
export default connect(
  (state, ownProps) => {
    const profileId = ownProps.profileId;
    const currentProfile = state.pastReminders.byProfileId[profileId];
    if (currentProfile) {
      return {
        header: currentProfile.header,
        subHeader: currentProfile.subHeader,
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        postLists: formatPostLists(currentProfile.posts),
        total: currentProfile.total,
        showComposer: state.pastReminders.showComposer,
        editMode: state.pastReminders.editMode,
        isManager: state.profileSidebar.selectedProfile.isManager,
        isLockedProfile: state.profileSidebar.isLockedProfile,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onShareAgainClick: ({ post }) => {
      dispatch(actions.handleShareAgainClick({
        post,
        profileId: ownProps.profileId,
      }));
    },
    onMobileClick: ({ post }) => {
      dispatch(actions.handleMobileClick({
        post,
      }));
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
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
    onImageClickNext: (post) => {
      dispatch(actions.handleImageClickNext({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClickPrev: (post) => {
      dispatch(actions.handleImageClickPrev({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onClickUpgradeToPro: () => {
      dispatch(modalsActions.showUpgradeModal({ source: 'locked_profile' }));
    },
  }),
)(PastRemindersList);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
/*
a consumer of a package should be able to use the package in the following way:
import Example, { actions, actionTypes, middleware, reducer } from '@bufferapp/publish-example';
*/
