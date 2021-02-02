import { getURL } from '@bufferapp/publish-server/formatters';

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

export const getConnectDirectURLs = ({ cta, accountChannelsURL }) => ({
  facebook:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/facebook/choose?cta=${cta}`,
  instagram:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/instagram/choose_business?cta=${cta}`,
  twitter:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/twitter?cta=${cta}`,
  linkedin:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/linkedin?cta=${cta}`,
  pinterest:
    accountChannelsURL ||
    `https://${getURL.getBaseURL()}/oauth/pinterest?cta=${cta}`,
});
