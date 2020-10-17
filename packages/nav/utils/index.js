const generateProfileTabs = ({ profile, organization }) => {
  const {
    hasApprovalFeature,
    hasDraftsFeature,
    showShowDraftsPaywall,
    hasGridFeature,
    hasStoriesFeature,
  } = organization || {};
  const { service, isManager, shouldHideAdvancedAnalytics } = profile || {};
  const isInstagramProfile = service === 'instagram';

  const tabsList = ['queue', 'analytics', 'settings'];

  if (isInstagramProfile) tabsList.push('pastReminders');
  if (!shouldHideAdvancedAnalytics) tabsList.push('overview');
  if (hasApprovalFeature && isManager) tabsList.push('awaitingApproval');
  if (hasApprovalFeature && !isManager) tabsList.push('pendingApproval');
  if (hasDraftsFeature || showShowDraftsPaywall) tabsList.push('drafts');
  if (hasGridFeature && isInstagramProfile) tabsList.push('grid');
  if (hasStoriesFeature && isInstagramProfile) tabsList.push('stories');

  return tabsList;
};

export default generateProfileTabs;
