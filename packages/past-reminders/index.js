// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
// load the presentational component
import { actions } from './reducer';
import PastRemindersPosts from './components/PastRemindersPosts';
import { header, subHeader } from './components/PastRemindersPosts/postData';

const formatPostLists = (posts) => {
  const postLists = [];
  let day;
  let newList;
  const orderedPosts = (posts && typeof posts === 'object') ?
    Object.values(posts).sort((a, b) => b.due_at - a.due_at) : [];

  orderedPosts.forEach((post) => {
    if (post.storyDetails) {
      post.postDetails = post.storyDetails;
    }

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
    const { profileId } = ownProps;
    const currentProfile = state.pastReminders.byProfileId[profileId];

    if (currentProfile) {
      return {
        header,
        subHeader,
        viewType: state.pastReminders.viewType,
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        postLists: formatPostLists(currentProfile.posts),
        total: currentProfile.total,
        showComposer: state.pastReminders.showComposer,
        editMode: state.pastReminders.editMode,
        isManager: state.profileSidebar.selectedProfile.isManager,
        isBusinessAccount: state.profileSidebar.selectedProfile.business,
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
    onToggleViewType: (viewType) => {
      dispatch(actions.handleToggleViewType({
        profileId: ownProps.profileId,
        viewType,
      }));
    },
  }),
)(PastRemindersPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
