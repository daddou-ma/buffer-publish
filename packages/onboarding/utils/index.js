import { getURL } from '@bufferapp/publish-server/formatters/src';

const cta = 'publish-app-onboarding-addProfile-1';

const getOnboardingConnectURLs = accountChannelsURL => ({
  facebook:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/facebook/choose?cta=${cta}`,
  instagram:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/instagram/choose_business?cta=${cta}`,
  pinterest:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/pinterest?cta=${cta}`,
  linkedin:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/linkedin?cta=${cta}`,
  twitter:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/twitter?cta=${cta}`,
});

export default getOnboardingConnectURLs;
