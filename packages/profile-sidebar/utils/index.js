import { getURL } from '@bufferapp/publish-server/formatters/src';

const cta = 'publish-app-sidebar-addProfile-1';

function isADifferentProfile(profile, prevProps) {
  return profile.id !== prevProps.profileId;
}

export const shouldGoToProfile = (profile, prevProps) => {
  return (
    profile &&
    (isADifferentProfile(profile, prevProps) || prevProps.profileId === null)
  );
};

export const filterProfilesByOrg = (profiles, organization) => {
  if (!organization) {
    return profiles;
  }
  return profiles?.filter(
    profile => profile.organizationId === organization.id
  );
};

export const getConnectShortcutURLs = accountChannelsURL => ({
  facebook:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/facebook/choose?cta=${cta}`,
  instagram:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/instagram/choose_business?cta=${cta}`,
  twitter:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/twitter?cta=${cta}`,
});
