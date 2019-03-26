// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { getProfilePageParams } from '@bufferapp/publish-routes';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import ProfilePage from './components/ProfilePage';

// default export = container
export default hot(module)(connect(
  (state, ownProps) => {
    let { tabId, profileId, childTabId } =
      getProfilePageParams({ path: ownProps.history.location.pathname }) || {};

    tabId = (tabId === 'analytics' && childTabId !== 'overview') ?
      'sent' : tabId;
    if (state[tabId] && state[tabId].byProfileId && state[tabId].byProfileId[profileId]) {
      return ({
        loading: state[tabId].byProfileId[profileId].loading,
        loadingMore: state[tabId].byProfileId[profileId].loadingMore,
        moreToLoad: state[tabId].byProfileId[profileId].moreToLoad,
        page: state[tabId].byProfileId[profileId].page,
        posts: state[tabId].byProfileId[profileId].posts,
        total: state[tabId].byProfileId[profileId].total,
        translations: state.i18n.translations.example,
        view: state[tabId].byProfileId[profileId].tabId || null,
        isBusinessAccount: state.profileSidebar.selectedProfile.business,
      });
    }
    return {};
  },
  dispatch => ({
    onLoadMore: ({ profileId, page, tabId, since }) => {
      let requestName;
      switch (tabId) {
        case 'queue':
          requestName = 'queued';
          break;
        case 'drafts':
        case 'awaitingApproval':
        case 'pendingApproval':
          requestName = 'draft';
          break;
        case 'analytics':
          requestName = 'sent';
          break;
        case 'pastReminders':
          requestName = 'pastReminders';
          break;
        default:
          requestName = 'queued';
      }
      dispatch(
        dataFetchActions.fetch({
          name: `${requestName}Posts`,
          args: {
            profileId,
            page,
            isFetchingMore: true,
            since,
          },
        }),
      );
    },
  }),
)(ProfilePage));
