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
            profilesCount,
            usersCount,
            ownerFeatures,
            isOwner,
            trial,
          } = orgSelected;
          let orgTrialData = {};
          if (trial) {
            orgTrialData = {
              trial: {
                hasCardDetails: trial && trial.hasCardDetails,
                onTrial: trial.onTrial,
                postTrialCost: trial && trial.postTrialCost,
                trialLength: trial && trial.length,
                trialTimeRemaining: trial && trial.timeRemaining,
                trialPlan: trial && trial.plan,
              },
              canStartProTrial: trial && trial.canStartProTrial && isOwner,
              shouldShowProTrialExpiredModal:
                trial &&
                trial.plan === 'pro' &&
                trial.onTrial &&
                trial.isExpired,
              shouldShowBusinessTrialExpiredModal:
                trial &&
                trial.plan !== 'pro' &&
                trial.onTrial &&
                trial.isExpired &&
                !trial.isDone,
            };
          }
          // Temporarily injecting org plan data in users. To be removed after org switcher rollout.
          if (hasOrgSwitcher) {
            return {
              ...user,
              plan,
              planCode,
              planBase,
              features: ownerFeatures,
              profileCount: profilesCount,
              orgUserCount: usersCount,
              isFreeUser: planBase === 'free',
              analyzeCrossSale: user.analyzeCrossSale && isOwner,
              canSeeOrgSwitcher: orgs && orgs.length >= 2,
              ...orgTrialData,
            };
          }
        }
        return user;
      })
      .catch(PublishAPI.errorHandler);
  }
);
