const hasProTrialExpired = trials =>
  trials.some(trial => trial.is_awesome && trial.status === 'expired');

const isOnBusinessPlan = trialPlan =>
  ['business', 'agency', 'small', 'premium_business'].some(
    plan => plan === trialPlan
  );

// The following two methods are being used for Awesome customers
// who are being migrated to Pro. These customers will technically
// still have their plan set to Awesome but will receive all of
// the features Pro users receive.
const getPlan = (plan, isAwesomeMigratingUser) =>
  isAwesomeMigratingUser ? 'pro' : plan;

const getPlanCode = (planCode, isAwesomeMigratingUser) =>
  isAwesomeMigratingUser ? 5 : planCode;

module.exports = userData => ({
  id: userData.id,
  email: userData.email,
  name: userData.name,
  createdAt: userData.created_at,
  features: userData.features,
  tags: userData.tags,
  hasTwentyFourHourTimeFormat: userData.twentyfour_hour_time,
  imageDimensionsKey: userData.imagedimensions_key,
  plan: getPlan(
    userData.plan,
    userData.features.includes('awesome_pro_forced_upgrade_batch_1') ||
      userData.features.includes('test_awesome_pro_forced_upgrade_batch_1')
  ),
  planCode: getPlanCode(
    userData.plan_code,
    userData.features.includes('awesome_pro_forced_upgrade_batch_1') ||
      userData.features.includes('test_awesome_pro_forced_upgrade_batch_1')
  ),
  is_business_user: userData.plan_code >= 8 && userData.plan_code <= 19,
  is_free_user: userData.plan === 'free',
  messages: userData.messages || [],
  new_contributions_emails_subscribe_link:
    userData.new_contributions_emails_subscribe_link,
  skip_empty_text_alert: userData.messages.includes(
    'remember_confirm_saving_modal'
  ),
  profile_groups: userData.profile_groups || [],
  s3_upload_signature: userData.s3_upload_signature,
  uses_24h_time: userData.twentyfour_hour_time,
  week_starts_monday: userData.week_starts_monday,
  has_ig_direct_flip: userData.features.includes('instagram_direct_posting'),
  twofactor: userData.twofactor,
  has_simplified_free_plan_ux: userData.features.includes(
    'has_simplified_free_plan_ux'
  ),
  hasIGLocationTaggingFeature: userData.features.includes(
    'instagram-location-tagging'
  ),
  hasIGDirectVideoFlip: userData.features.includes('ig_direct_video_posting'),
  profile_limit: userData.profile_limit,
  profiles_schedules_slots: userData.profiles_schedules_slots,
  hasNewPublish: userData.in_new_publish_rollout,
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
  canStartBusinessTrial: userData.can_start_business_trial,
  canStartProTrial: userData.can_start_pro_trial,
  isOnProTrial: userData.on_awesome_trial,
  shouldShowProTrialExpiredModal:
    hasProTrialExpired(userData.feature_trials) &&
    userData.plan === 'free' &&
    !userData.has_cancelled,
  isOnBusinessTrial: isOnBusinessPlan(userData.trial_plan),
  shouldShowBusinessTrialExpiredModal:
    isOnBusinessPlan(userData.trial_plan) &&
    userData.trial_expired &&
    !userData.trial_done,
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
  isNonprofit: userData.billing_status_nonprofit,
  orgUserCount: userData.org_user_count,
  profileCount: userData.profile_usage,
  showReturnToClassic: userData.has_np_app_switcher,
  isBusinessTeamMember: userData.is_business_team_member,
  isOnAwesomePlan:
    userData.plan === 'awesome' &&
    !(
      userData.features.includes('awesome_pro_forced_upgrade_batch_1') ||
      userData.features.includes('test_awesome_pro_forced_upgrade_batch_1')
    ),
  isAwesomePromoUser:
    userData.features.includes('legacy_awesome_monthly_promotion') &&
    userData.plan === 'awesome',
  hasAccessToUserTag: userData.is_pro_and_up_org_user, // this includes team members
  isAnalyzeCustomer: userData.is_analyze_customer,
  canSeePaydayPage: userData.features.includes('awesome_user_can_visit_payday'),
});
