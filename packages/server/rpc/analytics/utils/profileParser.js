module.exports = profile => ({
  id: profile._id,
  avatarUrl: profile.avatar_url,
  service: profile.service,
  timezone: profile.timezone,
  username: profile.service_username,
  organizationId: profile.organization_id,
});
