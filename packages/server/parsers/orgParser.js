const entitlements = require('../formatters/entitlements');

module.exports = orgData => ({
  id: orgData.id,
  globalOrgId: orgData.globalOrgId,
  locked: orgData.locked,
  selected: orgData.selected,
  name: orgData.name,
  ownerId: orgData.ownerId,
  ownerEmail: orgData.ownerEmail,
  ownerFeatures: orgData.ownerFeatures,
  shouldRedirectToAccountChannels: orgData.hasSharedChannels,
  plan: orgData.planName,
  planBase: orgData.planBase,
  planCode: orgData.planCode,
  isNonProfit: orgData.isNonProfit,
  profileLimit: orgData.profileLimit,
  profilesCount: orgData.profilesCount,
  usersCount: orgData.usersCount,
  isAdmin: orgData.isAdmin,
  isOwner: orgData.isOwner,
  trial: {
    hasCardDetails: orgData.trial && orgData.trial.hasCardDetails,
    onTrial: orgData.trial.onTrial,
    postTrialCost: orgData.trial && orgData.trial.postTrialCost,
    trialLength: orgData.trial && orgData.trial.length,
    trialTimeRemaining: orgData.trial && orgData.trial.timeRemaining,
    trialPlan: orgData.trial && orgData.trial.plan,
  },

  // Plan Features
  hasCampaignsFeature: orgData.entitlements.includes(entitlements.CAMPAIGNS),
  hasBitlyFeature: orgData.entitlements.includes(entitlements.CUSTOM_BITLY),
  has30DaySentPostsLimitFeature: orgData.entitlements.includes(
    entitlements.SENT_POSTS_30_DAYS
  ), // profiles_controller updates_sent() returns only 30 days of sent posts for free users.
  hasCalendarFeature: orgData.entitlements.includes(entitlements.CALENDAR),
  hasCustomizingUtmParamsFeature:
    orgData.entitlements.includes(entitlements.CUSTOMIZE_UTM_PARAM) &&
    orgData.isOwner,
  hasApprovalFeature: orgData.entitlements.includes(entitlements.APPROVAL_FLOW),
  hasDraftsFeature: orgData.entitlements.includes(entitlements.DRAFTS),
  hasGridFeature: orgData.entitlements.includes(entitlements.SHOP_GRID),
  hasStoriesFeature: orgData.entitlements.includes(entitlements.STORIES),
  hasTwitterImpressions: orgData.entitlements.includes(
    entitlements.TWITTER_IMPRESSIONS
  ),
  hasAnalyticsOnPosts: orgData.entitlements.includes(
    entitlements.ANALYTICS_ON_POSTS
  ),
  hasFirstCommentFeature: orgData.entitlements.includes(
    entitlements.FIRST_COMMENT
  ),
  hasShareNextFeature: orgData.entitlements.includes(entitlements.SHARE_NEXT),
  hasUserTagFeature: orgData.entitlements.includes(
    entitlements.TAG_USERS_IN_IMAGES
  ),
  hasPinterestFeature: orgData.entitlements.includes(entitlements.PINTEREST),
  hasCustomIgVideoCoverFeature: orgData.entitlements.includes(
    entitlements.CUSTOM_VIDEO_THUMBNAIL_INSTAGRAM
  ),
  hasHashtagManagerFeature: orgData.entitlements.includes(
    entitlements.HASHTAG_MANAGER
  ),
  hasProfileGroupsFeature: orgData.entitlements.includes(
    entitlements.CHANNEL_GROUPS_IN_COMPOSER
  ),
  hasAccessTeamPanel:
    orgData.entitlements.includes(entitlements.TEAMS_PANEL) && orgData.isAdmin,

  // Role Features
  canManageSocialAccounts: orgData.isAdmin,
  canSeeCampaignsReport: orgData.isOwner,
  canReorderProfiles: orgData.isOwner,
  canModifyCampaigns: orgData.isAdmin,
  canSeeBillingInfo: orgData.isOwner,
  canReconnectChannels: orgData.isAdmin,
  canStartProTrial:
    orgData.trial && orgData.trial.canStartProTrial && orgData.isOwner,

  // Upgrade/ Trial Paths
  showUpgradeToProCta: orgData.planBase === 'free',
  showUpgradeToBusinessCta: orgData.planBase === 'pro' && orgData.isOwner,
  showStartBusinessTrialCta:
    orgData.planBase === 'pro' &&
    orgData.trial &&
    orgData.trial.canStartBusinessTrial &&
    orgData.isOwner,
  shouldShowUpgradeButton:
    orgData.isOwner &&
    (orgData.planBase === 'free' ||
      orgData.planBase === 'pro' ||
      orgData.plan === 'solo_premium_business' ||
      orgData.plan === 'premium_business'),
  shouldShowProTrialExpiredModal:
    orgData.trial &&
    orgData.trial.plan === 'pro' &&
    orgData.trial.onTrial &&
    orgData.trial.isExpired &&
    orgData.isOwner,
  shouldShowBusinessTrialExpiredModal:
    orgData.trial &&
    orgData.trial.plan !== 'pro' &&
    orgData.trial.onTrial &&
    orgData.trial.isExpired &&
    !orgData.trial.isDone &&
    orgData.isOwner,
});
