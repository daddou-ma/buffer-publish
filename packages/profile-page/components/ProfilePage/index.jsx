import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import QueuedPosts from '@bufferapp/publish-queue';
import SentPosts from '@bufferapp/publish-sent';
import GridPosts from '@bufferapp/publish-grid';
import StoryGroups from '@bufferapp/publish-stories';
import PastReminders from '@bufferapp/publish-past-reminders';
import DraftList from '@bufferapp/publish-drafts';
import PostingSchedule from '@bufferapp/publish-posting-schedule';
import GeneralSettings from '@bufferapp/publish-general-settings';
import TabNavigation from '@bufferapp/publish-tabs';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import Analytics from '@bufferapp/publish-analytics';
import {
  ScrollableContainer,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import { getValidTab } from '@bufferapp/publish-tabs/utils';

const ErrorBoundary = getErrorBoundary(true);

const profilePageStyle = {
  display: 'flex',
  flexGrow: 1,
};

const profileSideBarStyle = {
  flexBasis: '16rem',
  width: '16rem',
  minWidth: '16rem',
  position: 'sticky',
  bottom: 0,
  top: 0,
  maxHeight: '100vh',
};

const contentStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0.5rem',
  marginRight: '1rem',
  minHeight: '100%',
};

const loadingAnimationStyle = {
  textAlign: 'center',
  margin: '1rem 0',
};

const tabContentStyle = {
  maxWidth: '864px',
  height: '100%',
};

/**
 * Verifies if the user can access to the current tabId
 * and changes the tab only if validTabId is different from current tabId
 *
 * @param tabId
 * @param profileId
 * @param selectedProfile
 * @param isFreeUser
 * @param onChangeTab method to change tab
 */
const verifyTab = (
  tabId,
  profileId,
  selectedProfile,
  isFreeUser,
  onChangeTab,
  hasStoriesFlip,
  childTabId,
  shouldHideAdvancedAnalytics
) => {
  let isInstagramProfile = false;
  let isBusinessAccount = false;
  let isManager = false;

  if (selectedProfile) {
    isInstagramProfile = selectedProfile.service === 'instagram';
    isBusinessAccount = selectedProfile.business;
    isManager = selectedProfile.isManager;

    const validTabId = getValidTab(
      tabId,
      isBusinessAccount,
      isInstagramProfile,
      isManager,
      isFreeUser,
      hasStoriesFlip,
      childTabId,
      shouldHideAdvancedAnalytics
    );

    // if current tabId is not valid, redirect to the queue
    if (tabId !== validTabId) {
      onChangeTab(validTabId, profileId);
    }
  }
};

const TabContent = ({
  tabId,
  profileId,
  childTabId,
  loadMore,
  selectedProfile,
  features,
  onChangeTab,
  hasStoriesFlip,
  shouldHideAdvancedAnalytics,
}) => {
  // if current tabId is not valid, redirect to the queue
  verifyTab(
    tabId,
    profileId,
    selectedProfile,
    features.isFreeUser(),
    onChangeTab,
    hasStoriesFlip,
    childTabId,
    shouldHideAdvancedAnalytics
  );

  switch (tabId) {
    case 'queue':
      return <QueuedPosts profileId={profileId} />;
    case 'pastReminders':
      return <PastReminders profileId={profileId} />;
    case 'grid':
      return <GridPosts profileId={profileId} />;
    case 'stories':
      return <StoryGroups profileId={profileId} />;
    case 'drafts':
    case 'awaitingApproval':
    case 'pendingApproval':
      return <DraftList profileId={profileId} tabId={tabId} />;
    case 'analytics':
      switch (childTabId) {
        case 'overview':
          return <Analytics />;
        case 'posts':
        default:
          return (
            <SentPosts
              profileId={profileId}
              tabId={tabId}
              loadMore={loadMore}
            />
          );
      }
    case 'settings':
      switch (childTabId) {
        case 'posting-schedule':
          return (
            <PostingSchedule profileId={profileId} childTabId={childTabId} />
          );
        case 'general-settings':
        default:
          return (
            <ErrorBoundary>
              <GeneralSettings profileId={profileId} childTabId={childTabId} />
            </ErrorBoundary>
          );
      }
    default:
      return <Redirect to="/" />;
  }
};

TabContent.propTypes = {
  tabId: PropTypes.string,
  childTabId: PropTypes.string,
  profileId: PropTypes.string.isRequired,
  onChangeTab: PropTypes.func,
  selectedProfile: PropTypes.shape({
    service: PropTypes.string,
    business: PropTypes.bool,
    isManager: PropTypes.bool,
  }),
  features: PropTypes.object.isRequired, // eslint-disable-line
  hasStoriesFlip: PropTypes.bool,
  shouldHideAdvancedAnalytics: PropTypes.bool,
};

TabContent.defaultProps = {
  tabId: '',
  childTabId: '',
  onChangeTab: () => {},
  selectedProfile: {},
  hasStoriesFlip: false,
  shouldHideAdvancedAnalytics: false,
};

function ProfilePage({
  match: {
    params: { profileId, tabId, childTabId },
  },
  onLoadMore,
  loadingMore,
  moreToLoad,
  page,
  selectedProfile,
  features,
  onChangeTab,
  hasStoriesFlip,
  shouldHideAdvancedAnalytics,
}) {
  const isQueueTab = tabId === 'queue' || tabId === 'stories';
  const isOtherPostsTab =
    [
      'drafts',
      'awaitingApproval',
      'pendingApproval',
      'pastReminders',
      'grid',
    ].includes(tabId) ||
    // analytics/posts is a child tab, so check for that too (it's the default if not present)
    (tabId === 'analytics' && (!childTabId || childTabId === 'posts'));

  const onReachBottom = () => {
    // We don't check `moreToLoad` for the queue since it has infinite loading
    if (isQueueTab && !loadingMore) {
      onLoadMore({ profileId, page, tabId });
    }
    if (isOtherPostsTab && moreToLoad && !loadingMore) {
      onLoadMore({ profileId, page, tabId });
    }
  };

  return (
    <div style={profilePageStyle}>
      <div style={profileSideBarStyle}>
        <ProfileSidebar profileId={profileId} tabId={tabId} />
      </div>
      <div style={contentStyle}>
        <TabNavigation
          profileId={profileId}
          tabId={tabId}
          childTabId={childTabId}
        />
        <ScrollableContainer
          profileId={profileId}
          tabId={tabId}
          growthSpace={1}
          loadingMore={loadingMore}
          moreToLoad={moreToLoad}
          onReachBottom={onReachBottom}
        >
          <div style={tabContentStyle}>
            <TabContent
              tabId={tabId}
              profileId={profileId}
              childTabId={childTabId}
              loadMore={onLoadMore}
              selectedProfile={selectedProfile}
              features={features}
              onChangeTab={onChangeTab}
              hasStoriesFlip={hasStoriesFlip}
              shouldHideAdvancedAnalytics={shouldHideAdvancedAnalytics}
            />
            {loadingMore && (
              <div style={loadingAnimationStyle}>
                <BufferLoading size={32} />
              </div>
            )}
          </div>
        </ScrollableContainer>
      </div>
    </div>
  );
}

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tabId: PropTypes.string,
      profileId: PropTypes.string,
      childTabId: PropTypes.string,
    }),
  }).isRequired,
  onLoadMore: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool,
  moreToLoad: PropTypes.bool,
  page: PropTypes.number,
  onChangeTab: PropTypes.func,
  selectedProfile: PropTypes.shape({
    service: PropTypes.string,
    business: PropTypes.bool,
    isManager: PropTypes.bool,
  }),
  features: PropTypes.object.isRequired, // eslint-disable-line
  hasStoriesFlip: PropTypes.bool,
  shouldHideAdvancedAnalytics: PropTypes.bool,
};

ProfilePage.defaultProps = {
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  posts: [],
  onChangeTab: () => {},
  selectedProfile: null,
  hasStoriesFlip: false,
  shouldHideAdvancedAnalytics: false,
};

export default WithFeatureLoader(ProfilePage);
