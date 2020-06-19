import { push } from 'connected-react-router';
import { matchPath } from 'react-router-dom';

export const newBusinessTrialistsRoute = '/new-business-trialists';

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

// Profiles routes
export const profilePages = {
  route: '/profile/:profileId',
  getRoute: ({ profileId }) => `/profile/${profileId}`,
  goTo: ({ profileId }) => push(`/profile/${profileId}`),
};

export const profileTabPages = {
  route: '/profile/:profileId/tab/:tabId',
  goTo: ({ profileId, tabId = 'queue' }) =>
    push(`/profile/${profileId}/tab/${tabId}`),
};

export const profileChildTabPages = {
  route: '/profile/:profileId/tab/:tabId/:childTabId?',
  goTo: ({ profileId, tabId, childTabId }) =>
    push(`/profile/${profileId}/tab/${tabId}/${childTabId}`),
};

export const getProfilesParams = ({ pathname }) => {
  return getParams({
    pathname,
    route: [profileChildTabPages.route, profilePages.route],
  });
};

// Miscellaneous routes
export const generic = {
  route: '/',
  goTo: () => push('/'),
};

export const newConnection = {
  route: '/new-connection',
  goTo: () => push('/new-connection'),
};

export const plansPage = {
  route: '/plans',
  goTo: () => push('/plans'),
};

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

// Organization Routes
export const organization = {
  route: '/org/:id/',
  goTo: ({ orgId }) => push(`/org/${orgId}`),
};
