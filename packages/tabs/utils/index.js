const getBaseURL = () => {
  return window.location.hostname === 'publish.local.buffer.com'
    ? 'https://local.buffer.com'
    : 'https://buffer.com';
};

const openCalendarWindow = profileId => {
  window.location.href = `${getBaseURL()}/app/profile/${profileId}/buffer/queue/calendar/week/?content_only=true`;
};

const openBillingWindow = () => {
  window.location.href = `${getBaseURL()}/app/account/receipts?content_only=true`;
};

/**
 * Checks if the user can go the selected tab and returns the proper one in case is invalid
 *
 * @param selectedTab: the new tab trying to be accessed
 *
 * @returns string validTabId with the valid tab, default value is 'queue'
 */
const getValidTab = ({
  tabId,
  childTabId,
  hasApprovalFeature,
  hasDraftsFeature,
  showShowDraftsPaywall,
  hasGridFeature,
  hasStoriesFeature,
  isInstagramProfile,
  isManager,
  shouldHideAdvancedAnalytics,
}) => {
  let validTabId = tabId;

  switch (tabId) {
    case 'queue':
      validTabId = 'queue';
      break;
    case 'pastReminders':
      validTabId = isInstagramProfile ? 'pastReminders' : 'queue';
      break;
    case 'analytics':
      if (childTabId === 'overview') {
        validTabId = shouldHideAdvancedAnalytics ? 'queue' : 'analytics';
      } else {
        validTabId = 'analytics';
      }
      break;
    case 'awaitingApproval':
      /* Team Members who are Managers */
      validTabId =
        hasApprovalFeature && isManager ? 'awaitingApproval' : 'queue';
      break;
    case 'pendingApproval':
      /* Team Members who are Contributors */
      validTabId =
        hasApprovalFeature && !isManager ? 'pendingApproval' : 'queue';
      break;
    case 'drafts':
      /* Pro and up users or Team Members */
      validTabId =
        hasDraftsFeature || showShowDraftsPaywall ? 'drafts' : 'queue';
      break;
    case 'grid':
      /* IG, Business users or Team Members */
      validTabId = hasGridFeature && isInstagramProfile ? 'grid' : 'queue';
      break;
    case 'stories':
      /* IG, Business users or Team Members */
      validTabId =
        hasStoriesFeature && isInstagramProfile ? 'stories' : 'queue';
      break;
    case 'settings':
      validTabId = 'settings';
      break;
    default:
      validTabId = 'queue';
  }

  return validTabId;
};

export { openCalendarWindow, openBillingWindow, getValidTab };
