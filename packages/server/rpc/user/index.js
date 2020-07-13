const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'user',
  'fetch user data',
  async (_, { session }, res, { PublishAPI, parsers }) => {
    const userData = await PublishAPI.get({
      uri: `1/user.json`,
      session,
      params: {
        includes: 'avatar',
      },
    }).then(user => parsers.userParser(user));
    const hasOrgSwitcher =
      userData &&
      userData.features &&
      userData.features.includes('org_switcher');

    // Temporarily injecting org plan data in users. To be removed after org switcher rollout.
    if (hasOrgSwitcher) {
      const orgs = await PublishAPI.get({
        uri: `1/user/organizations.json`,
        session,
      });

      const currentOrgId = userData.tempCurrentPublishOrganizationId;

      const orgSelected =
        (orgs && orgs.data && orgs.data.find(org => org.id === currentOrgId)) ||
        orgs[0];
      const { plan_code } = orgSelected;

      return {
        ...userData,
        planCode: plan_code,
      };
    }
    return {
      ...userData,
    };
  }
);
