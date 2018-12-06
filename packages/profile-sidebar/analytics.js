// mirror format used in analyze. Remove file once we stop using analyze components
const formatAnalyticsProfileObj =
({ id, avatarUrl, service, timezone, username, organizationId }) => ({
  id,
  avatarUrl,
  service,
  timezone,
  username,
  organizationId,
});

module.exports = { formatAnalyticsProfileObj };
