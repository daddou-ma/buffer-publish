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
    postFailureNotifications: userData.email_notifications.includes(
      'postFailureNotifications'
    ),
  },
  analyzeCrossSale: userData.is_analyze_customer,
  features: userData.features, // these are user features only, for org features (owner features) check org parser
});
