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
              canStartBusinessTrial:
                trial && trial.canStartBusinessTrial && isOwner,
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
              showBusinessTrialistsOnboarding:
                planBase === 'business' && trial && trial.onTrial,
            };
          }
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
              canSeeCampaignsReport: isOwner,
              canModifyCampaigns: isAdmin,
              showUpgradeToProCta: planBase === 'free' && isOwner,
              hasShareNextFeature: planBase !== 'free',
              hasUserTagFeature: planBase !== 'free',
              analyzeCrossSale: user.analyzeCrossSale && isOwner,
              canManageSocialAccounts: isAdmin,
              hasAccessTeamPanel: planBase === 'business' && isAdmin,
              ...orgTrialData,
            };
          }
        }
        return user;
      })
      .catch(PublishAPI.errorHandler);
  }
);
