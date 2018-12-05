// mirror format used in analyze. Remove file once we stop using analyze components
const formatAnalyticsProfileObj = ({ id, service, timezone, service_username, avatarUrl }) => (
  {
    id,
    avatarUrl,
    service,
    timezone,
    username: service_username,
    organizationId: '',
  }
);
// only business users who have a facebook or twitter profile selected can view analytics
const canUserViewAnalytics = profile => (
  ((profile && profile.business &&
    (profile.service === 'twitter' || profile.service === 'facebook')))
);

module.exports = { formatAnalyticsProfileObj, canUserViewAnalytics };
