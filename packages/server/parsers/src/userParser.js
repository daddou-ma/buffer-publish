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
    collaborationNotifications: userData.email_notifications.includes(
      'collaborationNotifications'
    ),
    queueNotifications: userData.email_notifications.includes(
      'queueNotifications'
    ),
    newsletterNotifications: userData.email_notifications.includes(
      'newsletterNotifications'
    ),
    milestonesNotifications: userData.email_notifications.includes(
      'milestonesNotifications'
    ),
  },

  /* TEMPORARY. TO BE MOVED TO ORGS AFTER ORG SWITCHER ROLLOUT */

  // Org roles features
  analyzeCrossSale: userData.is_analyze_customer,
  canStartProTrial: userData.can_start_pro_trial,
  shouldShowProTrialExpiredModal:
    hasProTrialExpired(userData.feature_trials) &&
    userData.billing_plan_base === 'free' &&
    !userData.has_cancelled,
  shouldShowBusinessTrialExpiredModal:
    userData.on_trial && userData.trial_expired && !userData.trial_done,
  canSeeOrgSwitcher: false, // temporary value, the important is what's being injected in the rpc

  // Org data
  plan: userData.billing_plan_tier,
  planBase: userData.billing_plan_base,
  planCode: userData.plan_code,
  isFreeUser: userData.billing_plan_base === 'free',
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
  // add temporary way for buffer admin to connect personal ig profile
  canSeeIGPersonalProfileConnect: userData.is_admin,
});
