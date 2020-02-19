const profileRouteRegex = /profile\/(\w+)\/tab\/(\w+)(?:\/(\w+))?/;
export const getProfilePageParams = ({ path }) => {
  const match = profileRouteRegex.exec(path);
  if (!match) {
    return null;
  }
  return {
    profileId: match[1],
    tabId: match[2],
    childTabId: match[3],
  };
};

export const generateChildTabRoute = ({
  profileId,
  tabId = 'queue',
  childTabId = 'general-settings',
}) => `/profile/${profileId}/tab/${tabId}/${childTabId}`;

export const generateProfilePageRoute = ({ profileId, tabId = 'queue' }) =>
  `/profile/${profileId}/tab/${tabId}`;

export const profilePageRoute = generateProfilePageRoute({
  profileId: ':profileId',
  tabId: ':tabId',
});

export const childTabRoute = generateChildTabRoute({
  profileId: ':profileId',
  tabId: ':tabId',
  childTabId: ':childTabId',
});

export const generatePreferencePageRoute = ({ preferenceId }) =>
  `/preferences/${preferenceId}`;

export const plansPageRoute = '/plans';

export const newBusinessTrialistsRoute = '/new-business-trialists';

export const newConnectionRoute = '/new-connection';

export const preferencePageRoute = generatePreferencePageRoute({
  preferenceId: ':preferenceId',
});

export const campaignsPageRoute = '/campaigns';
export const campaignsCreateRoute = '/campaigns/create';

export const generateCampaignPageRoute = ({ campaignId }) =>
  `/campaigns/${campaignId}`;

export const campaignRoute = generateCampaignPageRoute({
  campaignId: ':campaignId',
});

// const campaignRouteRegex = /campaigns\/?(\w+)?/;
const campaignRouteRegex = /\bcampaigns\b\/?(\w+)?\/?(\w+)?/;
export const getCampaignPageParams = ({ path }) => {
  const match = campaignRouteRegex.exec(path);
  if (!match) {
    return null;
  }
  return {
    campaigns: match[0],
    campaignId: match[1],
    campaignPage: match[2],
  };
};

const preferenceRouteRegex = /preferences\/(\w+)/;
export const getPreferencePageParams = ({ path }) => {
  const match = preferenceRouteRegex.exec(path);
  if (!match) {
    return null;
  }
  return {
    preferenceId: match[1],
  };
};
