// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { getProfilesParams, profileTabPages } from '@bufferapp/publish-routes';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
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

const getRequestMaxCount = tabId =>
  ({
    queue: 300,
  }[tabId]);

export const getRequestName = tabId =>
  requestName(tabId) || requestName('default');

// default export = container
export default hot(
  connect(
    (state, ownProps) => {
      const params = getProfilesParams({
        pathname: ownProps.history.location.pathname,
      });

      const { tabId, profileId, childTabId } = params || {};

      // With analytics, the reducer state name doesnt match the tabId
      let reducerName =
        tabId === 'analytics' && (!childTabId || childTabId === 'posts')
          ? 'sent'
          : tabId;

      if (tabId === 'awaitingApproval' || tabId === 'pendingApproval')
        reducerName = 'drafts';
      if (state?.[reducerName]?.byProfileId?.[profileId]) {
        const currentQueue = state[reducerName].byProfileId[profileId];
        return {
          loadingMore: currentQueue.loadingMore,
          moreToLoad: currentQueue.moreToLoad,
          page: currentQueue.page,
          profileNavTabs: state.nav.profileNavTabs,
        };
      }
      return {
        profileNavTabs: state.nav.profileNavTabs,
      };
    },
    dispatch => ({
      onChangeTab: ({ profileId }) => {
        dispatch(
          profileTabPages.goTo({
            profileId,
            tabId: 'queue',
          })
        );
      },
      onLoadMore: ({ profileId, page, tabId }) => {
        const args = {
          profileId,
          page,
          isFetchingMore: true,
          needsApproval: ['awaitingApproval', 'pendingApproval'].includes(
            tabId
          ),
        };

        if (getRequestMaxCount(tabId)) {
          args.count = getRequestMaxCount(tabId);
        }
        dispatch(
          dataFetchActions.fetch({
            name: getRequestName(tabId),
            args,
          })
        );
      },
    })
  )(ProfilePage)
);
