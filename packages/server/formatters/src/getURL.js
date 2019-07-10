module.exports = {
  getBaseURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'local.buffer.com';
    }
    return 'buffer.com';
  },
  getClassicBufferURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/classic';
    }
    return 'https://buffer.com/classic';
  },
  getBackToClassicNewPublishBufferURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/back_publish';
    }
    return 'https://buffer.com/back_publish';
  },
  getManageURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/manage';
    }
    return 'https://buffer.com/manage';
  },
  getConnectSocialAccountURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/manage/accounts/connect';
    }
    return 'https://buffer.com/manage/accounts/connect';
  },
  getManageSocialAccountURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/manage/own';
    }
    return 'https://buffer.com/manage/own';
  },
  getManageTeamURL: () => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return 'https://local.buffer.com/manage/team-members';
    }
    return 'https://buffer.com/manage/team-members';
  },
  getInstagramDirectPostingURL: (profileId) => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return `https://local.buffer.com/instagram/setup?profile_id=${profileId}`;
    }
    return `https://buffer.com/instagram/setup?profile_id=${profileId}`;
  },
  getConnectBitlyURL: (profileId) => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return `https://local.buffer.com/oauth/bitly/${profileId}/auth`;
    }
    return `https://buffer.com/oauth/bitly/${profileId}/auth`;
  },
  getDisconnectBitlyURL: (profileId) => {
    if (window.location.hostname === 'publish.local.buffer.com') {
      return `https://local.buffer.com/profile/disconnect_bitly_auth/${profileId}`;
    }
    return `https://buffer.com/profile/disconnect_bitly_auth/${profileId}`;
  },
  getStartTrialURL: ({ trialType, cta, nextUrl }) => {
    const nextParam = nextUrl ? `&next=${nextUrl}` : '';
    const ctaParam = cta ? `&cta=${cta}` : '';
    if (window.location.hostname === 'publish.local.buffer.com') {
      return `https://local.buffer.com/billing/start-trial?trialType=${trialType}${ctaParam}${nextParam}`;
    }
    return `https://buffer.com/billing/start-trial?trialType=${trialType}${ctaParam}${nextParam}`;
  },
  getBillingURL: ({ cta }) => {
    const ctaParam = cta ? `&cta=${cta}` : '';
    if (window.location.hostname === 'publish.local.buffer.com') {
      return `https://local.buffer.com/app/account/receipts?content_only=true${ctaParam}`;
    }
    return `https://buffer.com/app/account/receipts?content_only=true${ctaParam}`;
  },
};
