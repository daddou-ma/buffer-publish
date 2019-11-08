// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { getProfilePageParams } from '@bufferapp/publish-routes';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions } from '@bufferapp/publish-tabs';
import ProfilePage from './components/ProfilePage';

const requestName = tabId =>
  ({
    queue: 'queuedPosts',
    drafts: 'draftPosts',
    awaitingApproval: 'draftPosts',
    pendingApproval: 'draftPosts',
    grid: 'gridPosts',
    analytics: 'sentPosts',
    pastReminders: 'pastRemindersPosts',
    stories: 'getStoryGroups',
    default: 'queuedPosts',
  }[tabId]);

export const getRequestName = tabId =>
  requestName(tabId) || requestName('default');

// default export = container
export default hot(
  connect(
    (state, ownProps) => {
      const { tabId, profileId, childTabId } =
        getProfilePageParams({ path: ownProps.history.location.pathname }) ||
        {};
      // With analytics, the reducer state name doesnt match the tabId
      let reducerName =
        tabId === 'analytics' && (!childTabId || childTabId === 'posts')
          ? 'sent'
          : tabId;
      if (tabId === 'awaitingApproval' || tabId === 'pendingApproval')
        reducerName = 'drafts';
      if (
        state[reducerName] &&
        state[reducerName].byProfileId &&
        state[reducerName].byProfileId[profileId]
      ) {
        return {
          loading: state[reducerName].byProfileId[profileId].loading,
          loadingMore: state[reducerName].byProfileId[profileId].loadingMore,
          moreToLoad: state[reducerName].byProfileId[profileId].moreToLoad,
          page: state[reducerName].byProfileId[profileId].page,
          posts: state[reducerName].byProfileId[profileId].posts,
          total: state[reducerName].byProfileId[profileId].total,
          translations: state.i18n.translations.example,
          view: state[reducerName].byProfileId[profileId].tabId || null,
          isBusinessAccount: state.profileSidebar.selectedProfile.business,
          selectedProfile: state.profileSidebar.selectedProfile,
          hasStoriesFlip: state.appSidebar.user.features
            ? state.appSidebar.user.features.includes('stories_groups')
            : false,
          shouldHideAdvancedAnalytics: state.profileSidebar.selectedProfile
            ? state.profileSidebar.selectedProfile.shouldHideAdvancedAnalytics
            : false,
        };
      }
      return {};
    },
    dispatch => ({
      onChangeTab: (tabId, profileId) => {
        dispatch(
          actions.selectTab({
            tabId,
            profileId,
          })
        );
      },
      onLoadMore: ({ profileId, page, tabId }) => {
        dispatch(
          dataFetchActions.fetch({
            name: getRequestName(tabId),
            args: {
              profileId,
              page,
              isFetchingMore: true,
              needsApproval: ['awaitingApproval', 'pendingApproval'].includes(
                tabId
              ),
            },
          })
        );
      },
    })
  )(ProfilePage)
);
