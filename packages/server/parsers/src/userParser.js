const hasProTrialExpired = trials =>
  trials.some(trial => trial.is_awesome && trial.status === 'expired');

module.exports = userData => ({
  id: userData.id,
  email: userData.email,
  name: userData.name,
  language: userData.language || 'en-US',
  createdAt: userData.created_at,
  tags: userData.tags,
  hasTwentyFourHourTimeFormat: userData.twentyfour_hour_time,
  imageDimensionsKey: userData.imagedimensions_key,
  messages: userData.messages || [],
  skip_empty_text_alert: userData.messages.includes(
    'remember_confirm_saving_modal'
  ),
  profile_groups: userData.profile_groups || [],
  s3_upload_signature: userData.s3_upload_signature,
  week_starts_monday: userData.week_starts_monday,
  twofactor: userData.twofactor,
  profiles_schedules_slots: userData.profiles_schedules_slots,
  hasEmailNotifications: {
    bufferEmpty: userData.email_notifications.includes('buffer_empty'),
    bufferTips: userData.email_notifications.includes('buffer_tips'),
    updateFailures: userData.email_notifications.includes('update_failures'),
    updateSuccesses: userData.email_notifications.includes('update_successes'),
    weeklyDigests: userData.email_notifications.includes('weekly_digests'),
    newContributions: userData.email_notifications.includes(
      'new_contributions'
    ),
    postMovedBackToDrafts: userData.email_notifications.includes(
      'post_moved_back_to_drafts'
    ),
    celebrations: userData.email_notifications.includes('celebrations'),
  },
  hasOrgSwitcherFeature: userData.features.includes('org_switcher'),
  hasPublishBeta: userData.features.includes('new_publish_beta'),
  hasPublishBetaRedirect: userData.features.includes(
    'new_publish_beta_redirect'
  ),

  // Deprecated features (to delete)
  has_simplified_free_plan_ux: false,
  hasIGLocationTaggingFeature: true,
  hasIGDirectVideoFlip: true,

  /* TEMPORARY. TO BE MOVED TO ORGS AFTER ORG SWITCHER ROLLOUT */
  // Org plan features
  hasCampaignsFeature: userData.features.includes('campaigns'),
  hasFirstCommentFeature: userData.features.includes('first_comment'),
  hasShareNextFeature:
    userData.billing_plan_base !== 'free' ||
    (userData.billing_plan_base === 'free' && userData.is_business_team_member),
  hasUserTagFeature: userData.is_pro_and_up_org_user,
  showBusinessTrialistsOnboarding:
    userData.billing_plan_base === 'business' && userData.on_trial,

  // Org roles features
  canModifyCampaigns: !userData.is_using_publish_as_team_member,
  canSeeCampaignsReport: !userData.is_using_publish_as_team_member,
  showUpgradeToProCta:
    userData.billing_plan_base === 'free' && !userData.is_business_team_member,
  analyzeCrossSale: userData.is_analyze_customer,
  canManageSocialAccounts: true, // temporary value, the important is what's being injected in the rpc
  canSeeBillingInfo: true, // temporary value, the important is what's being injected in the rpc
  shouldShowUpgradeButton:
    userData.billing_plan_base === 'free' ||
    userData.billing_plan_base === 'pro' ||
    userData.billing_plan_tier === 'solo_premium_business' ||
    userData.billing_plan_tier === 'premium_business',
  hasAccessTeamPanel: userData.billing_plan_base !== 'free',
  canStartBusinessTrial: userData.can_start_business_trial,
  canStartProTrial: userData.can_start_pro_trial,
  shouldShowProTrialExpiredModal:
    hasProTrialExpired(userData.feature_trials) &&
    userData.billing_plan_base === 'free' &&
    !userData.has_cancelled,
  shouldShowBusinessTrialExpiredModal:
    userData.on_trial && userData.trial_expired && !userData.trial_done,
  canSeeOrgSwitcher: false, // temporary value, the important is what's being injected in the rpc
  canReconnectChannels: true, // temporary value, the important is what's being injected in the rpc

  // Org data
  plan:
    userData.billing_plan_tier === 'pro8' ||
    userData.billing_plan_tier === 'pro15'
      ? 'pro'
      : userData.billing_plan_tier, // temporary, as we transition from userData.plan. Safe to delete the conditions once we remove the plan ==='pro' checks in the codebase .
  planBase: userData.billing_plan_base,
  planCode: userData.plan_code,
  isBusinessUser: userData.billing_plan_base === 'business',
  isFreeUser: userData.billing_plan_base === 'free',
  isProUser: userData.billing_plan_base === 'pro',
  profileLimit: userData.profile_limit,
  isNonprofit: userData.billing_status_nonprofit,
  orgUserCount: userData.org_user_count,
  profileCount: userData.profile_usage,
  trial: userData.on_awesome_trial
    ? {
        hasCardDetails: userData.has_card_details,
        hasTrialExtended: userData.has_trial_extended,
        onTrial: userData.on_awesome_trial,
        postTrialCost: '',
        trialLength: userData.awesome_trial_length,
        trialTimeRemaining: userData.awesome_trial_time_remaining,
      }
    : {
        hasCardDetails: userData.has_card_details,
        hasTrialExtended: userData.has_trial_extended,
        onTrial: userData.on_trial,
        postTrialCost: userData.post_trial_cost,
        trialLength: userData.trial_length,
        trialTimeRemaining: userData.trial_time_remaining,
        trialPlan: userData.trial_plan,
      },

  // Org owner data
  features: userData.features,
});
