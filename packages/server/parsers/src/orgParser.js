module.exports = orgData => ({
  id: orgData.id,
  globalOrgId: orgData.globalOrgId,
  locked: orgData.locked,
  selected: orgData.selected,
  name: orgData.name,
  ownerId: orgData.ownerId,
  ownerEmail: orgData.ownerEmail,
  ownerFeatures: orgData.ownerFeatures,
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
  hasCampaignsFeature: orgData.planBase !== 'free',
  hasAnalyticsFeature: orgData.planBase === 'business',
  hasBitlyFeature: orgData.planBase !== 'free',
  has30DaySentPostsLimitFeature: orgData.planBase === 'free', // profiles_controller updates_sent() returns only 30 days of sent posts for free users.
  hasCalendarFeature: orgData.planBase !== 'free',
  hasShareAgainFeature: orgData.planBase !== 'free',
  hasCustomizingUtmParamsFeature:
    orgData.planBase === 'business' && orgData.isOwner,
  hasApprovalFeature: orgData.planBase === 'business',
  hasDraftsFeature: orgData.planBase !== 'free',
  hasGridFeature: orgData.planBase === 'business',
  hasStoriesFeature: orgData.planBase === 'business',
  hasTwitterImpressions: orgData.planBase === 'business',
  hasAnalyticsOnPosts: orgData.planBase !== 'free',
  hasFirstCommentFeature: orgData.planBase !== 'free',
  hasShareNextFeature: orgData.planBase !== 'free',
  hasUserTagFeature: orgData.planBase !== 'free',
  hasPinterestFeature: orgData.planBase !== 'free',
  hasCustomIgVideoCoverFeature: orgData.planBase !== 'free',
  hasHashtagManagerFeature: orgData.planBase === 'business',
  hasProfileGroupsFeature: orgData.planBase === 'business',
  hasAccessTeamPanel: orgData.planBase === 'business' && orgData.isAdmin,

  // Role Features
  canManageSocialAccounts: orgData.isAdmin,
  canSeeCampaignsReport: orgData.isOwner,
  canModifyCampaigns: orgData.isAdmin,
  canSeeBillingInfo: orgData.isOwner,
  canReconnectChannels: orgData.isAdmin,
  canStartBusinessTrial:
    orgData.trial && orgData.trial.canStartBusinessTrial && orgData.isOwner,
  canStartProTrial:
    orgData.trial && orgData.trial.canStartProTrial && orgData.isOwner,
  // add temporary way for buffer admin to connect personal ig profile
  canSeeIGPersonalProfileConnect: orgData.isAdmin,

  // Upgrade/ Trial Paths
  showUpgradeToProCta: orgData.planBase === 'free',
  showUpgradeToBusinessCta: orgData.planBase === 'pro',
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
    orgData.trial.isExpired,
  shouldShowBusinessTrialExpiredModal:
    orgData.trial &&
    orgData.trial.plan !== 'pro' &&
    orgData.trial.onTrial &&
    orgData.trial.isExpired &&
    !orgData.trial.isDone,
  showBusinessTrialistsOnboarding:
    orgData.planBase === 'business' &&
    orgData.trial &&
    orgData.trial.onTrial &&
    orgData.isAdmin,
});
