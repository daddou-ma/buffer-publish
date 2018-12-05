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

module.exports = { formatAnalyticsProfileObj };
