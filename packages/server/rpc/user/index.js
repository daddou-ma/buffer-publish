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
      }),
      PublishAPI.get({
        uri: `1/user/organizations.json`,
        session,
      }).catch(() => {
        return [];
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
        const orgSelected = (orgs && orgs.find(org => org.selected)) || orgs[0];
        if (orgSelected) {
          const {
            planCode,
            planBase,
            plan,
            isNonProfit,
            profileLimit,
            profilesCount,
            usersCount,
            ownerFeatures,
            isAdmin,
            ownerId,
          } = orgSelected;
          // Temporarily injecting org plan data in users. To be removed after org switcher rollout.
          if (hasOrgSwitcher) {
            return {
              ...user,
              plan: plan === 'pro8' || plan === 'pro15' ? 'pro' : plan,
              planCode,
              planBase,
              features: ownerFeatures,
              isNonprofit: isNonProfit,
              profileLimit,
              profileCount: profilesCount,
              orgUserCount: usersCount,
              hasCampaignsFeature: planBase !== 'free',
              hasFirstCommentFeature: planBase !== 'free',
              isBusinessUser: planBase === 'business',
              isFreeUser: planBase === 'free',
              isProUser: planBase === 'pro',
              canSeeCampaignsReport: ownerId === user.id,
              canModifyCampaigns: isAdmin,
              showUpgradeToProCta: planBase === 'free' && ownerId === user.id,
            };
          }
        }
        return user;
      })
      .catch(PublishAPI.errorHandler);
  }
);
