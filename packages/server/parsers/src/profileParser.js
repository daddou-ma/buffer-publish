const isInstagramAnalyticsSupported = profile =>
  profile.service === 'instagram' && profile.is_instagram_business;

module.exports = profile => ({
  id: profile.id,
  avatarUrl: profile.avatar_https,
  avatar_https: profile.avatar_https,
  canPostComment: profile.can_post_comment,
  type: profile.service,
  handle: profile.service_username,
  isManager: profile.organization_role === 1,
  ownerId: profile.user_id,
  pendingCount: profile.counts.pending,
  sentCount: profile.counts.sent,
  timezone: profile.timezone,
  timezone_city: profile.timezone_city,
  schedules: profile.schedules,
  pausedSchedules: profile.paused_schedules,
  service: profile.service,
  service_type: profile.service_type,
  serviceUsername: profile.service_username,
  serviceId: profile.service_id,
  service_username: profile.service_username,
  should_post_direct: profile.should_post_direct,
  formatted_username: profile.formatted_username,
  subprofiles: profile.subprofiles,
  disabled: profile.disabled,
  business: profile.business,
  default: profile.default,
  paused: profile.paused,
  open: false,
  organizationRole: profile.organization_role,
  directPostingEnabled: profile.direct_posting_enabled,
  isInstagramBusiness: profile.is_instagram_business,
  shouldDisplayIGPersonalNotification:
    profile.service === 'instagram' && !profile.is_instagram_business,
  googleAnalyticsEnabled: profile.preferences.utm_tracking,
  hasPushNotifications: profile.has_push_notifications,
  isContributor: profile.is_contributor,
  isDisconnected: profile.oauth_broken,
  location: profile.location,
  shouldHideAdvancedAnalytics: profile.should_hide_advanced_analytics,
  // Remove when publish stops importing Analyze components
  organizationId: profile.organization_id,
  username: profile.service_username,
  isAnalyticsSupported:
    profile &&
    profile.business &&
    (profile.service === 'twitter' ||
      profile.service === 'facebook' ||
      isInstagramAnalyticsSupported(profile)),
  customLinksDetails: {
    buttonColor: profile.custom_links_color,
    buttonContrastColor: profile.custom_links_contrast_color,
    buttonType: profile.custom_links_button_type,
    customLinks: profile.custom_links,
  },
  permissions: profile.permissions,
});
