const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'user',
  'fetch user data',
  async (_, { session }, res, { PublishAPI, parsers }) => {
    return Promise.all([
      PublishAPI.get({
        uri: `1/user.json`,
        session,
        params: {
          includes: 'avatar',
        },
      }).catch(PublishAPI.errorHandler),
      PublishAPI.get({
        uri: `1/user/organizations.json`,
        session,
      }),
    ])
      .then(([user, { data }]) => {
        return [
          parsers.userParser(user),
          data.map(org => parsers.orgParser(org)),
        ];
      })
      .then(([user, orgs]) => {
        const hasOrgSwitcher =
          user && user.features && user.features.includes('org_switcher');
        const orgSelected =
          (orgs && orgs.data && orgs.data.find(org => org.selected)) || orgs[0];
        if (orgSelected) {
          const { planCode } = orgSelected;
          // Temporarily injecting org plan data in users. To be removed after org switcher rollout.
          if (hasOrgSwitcher) {
            return { ...user, planCode };
          }
        }
        return user;
      });
  }
);
