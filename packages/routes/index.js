import { push } from 'connected-react-router';
import { matchPath } from 'react-router-dom';

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

export const plansPageRoute = '/plans';

export const newBusinessTrialistsRoute = '/new-business-trialists';

export const newConnectionRoute = '/new-connection';

// Routes utils
export const getMatch = ({ pathname, route }) =>
  matchPath(pathname, {
    path: route,
  });

export const getParams = ({ pathname, route }) => {
  const match = getMatch({ pathname, route });
  return match?.params || null;
};

export const goTo = path => push(path);

// Preferences routes
export const preferencesPage = {
  route: '/preferences',
  goTo: () => push('/preferences'),
};

export const preferencesAppsExtras = {
  route: '/preferences/appsandextras',
  goTo: () => push('/preferences/appsandextras'),
};

export const preferencesSecurity = {
  route: '/preferences/security',
  goTo: () => push('/preferences/security'),
};

export const preferencesGeneral = {
  route: '/preferences/general',
  goTo: () => push('/preferences/general'),
};

export const preferencesNotifications = {
  route: '/preferences/notifications',
  goTo: () => push('/preferences/notifications'),
};

// Campaigns routes
export const campaignsPage = {
  route: '/campaigns',
  goTo: () => push('/campaigns'),
};

export const campaignCreate = {
  route: '/campaigns/new',
  goTo: () => push('/campaigns/new'),
};

export const campaignEdit = {
  route: '/campaigns/:id/edit/',
  goTo: ({ campaignId, from }) =>
    push(`/campaigns/${campaignId}/edit`, { from }),
};

export const campaignScheduled = {
  route: '/campaigns/:id/scheduled/',
  getRoute: ({ campaignId }) => `/campaigns/${campaignId}/scheduled`,
  goTo: ({ campaignId }) => push(`/campaigns/${campaignId}/scheduled`),
};

export const campaignSent = {
  route: '/campaigns/:id/sent/',
  goTo: ({ campaignId }) => push(`/campaigns/${campaignId}/sent`),
};
