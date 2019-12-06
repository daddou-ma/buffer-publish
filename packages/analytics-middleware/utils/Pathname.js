const PROFILE_PAGES_PATH_REGEX = /^\/(\w*)\/(\w*)\/(\w*)\/(\w*)\/?(.*)/;
const PAGE_PATH_REGEX = /^\/(\w*)\/?(\w*)\/?$/;

function getPageName({ page, subPage }) {
  let pageName = null;
  let defaultSubPage = 'general-settings';
  switch (page) {
    case 'analytics':
      defaultSubPage = 'posts';
    case 'settings':
      // pages have default views even if sub-route name isnt present
      pageName = subPage ? `${page} ${subPage}` : `${page} ${defaultSubPage}`;
      break;
    default:
      pageName = page;
      break;
  }
  return pageName;
}

function getElementFromPath(path, element) {
  const match = path.match(PROFILE_PAGES_PATH_REGEX);
  if (match) {
    const [
      route, // eslint-disable-line no-unused-vars
      channel, // eslint-disable-line no-unused-vars
      channelId,
      tab,
      page,
      subPage,
    ] = match;

    switch (element) {
      case 'channelId':
        return channelId;
      case 'pageName':
        return getPageName({ page, subPage }) || null;
      default:
        return null;
    }
  }

  return null;
}

function getChannelById(channel, channelId) {
  return channel.find(p => p.id === channelId) || null;
}

function getChannelFromPath(path, channels) {
  const channelId = getElementFromPath(path, 'channelId');
  if (channelId) {
    return getChannelById(channels, channelId);
  }

  return null;
}

const getPageNameFromPath = path => {
  const name = getElementFromPath(path, 'pageName');
  if (name) {
    return name;
  }

  const page = path.match(PAGE_PATH_REGEX);
  if (page && page[1] && page[1].length) {
    // check for subnames if preferences
    return page[2] && page[2].length ? `${page[1]} ${page[2]}` : page[1];
  }

  return path;
};

const getChannelIfNeeded = ({ path, getState }) => {
  const match = path.match(PROFILE_PAGES_PATH_REGEX);
  if (match) {
    // Previously this code depended on the `profiles` reducer but
    // this was from the shared analyze code which is now lazy-loaded,
    // so we use the profileSidebar instead.
    const { profiles } = getState().profileSidebar;
    if (!profiles || profiles.length === 0) {
      return null;
    }
    const channel = getChannelFromPath(path, profiles);
    return channel ? channel.service : null;
  }
  return null;
};

export { getPageNameFromPath, getChannelIfNeeded };
