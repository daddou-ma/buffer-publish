const PROFILE_PAGES_PATH_REGEX = /^\/(\w*)\/(\w*)\/(\w*)\/(\w*)\/?(.*)/;
const PAGE_PATH_REGEX = /^\/(\w*)\/?(\w*)\/?$/;

function getPageName({ tab, page, subPage }) {
  let pageName = null;
  if (tab === 'tab') {
    switch (page) {
      case 'analytics':
      case 'settings': {
        // pages have default views even if sub-route name isnt present
        const defaultSubPage = page === 'analytics' ? 'posts' : 'general-settings';
        pageName = subPage ? `${page} ${subPage}` : `${page} ${defaultSubPage}`;
        break;
      }
      default: pageName = page;
        break;
    }
  }
  return pageName;
}

function getElementFromPath(path, element) {
  const match = path.match(PROFILE_PAGES_PATH_REGEX);
  if (match) {
    const [
      route, // eslint-disable-line no-unused-vars
      profile,
      profileId,
      tab,
      page,
      subPage,
    ] = match;

    switch (element) {
      case 'profileId':
        return profileId;
      case 'pageName':
        return getPageName({ tab, page, subPage }) || null;
      default:
        return null;
    }
  }

  return null;
}

function getProfileById(profiles, profileId) {
  return profiles.find(p => p.id === profileId) || null;
}

function getProfileFromPath(path, profiles) {
  const profileId = getElementFromPath(path, 'profileId');
  if (profileId) {
    return getProfileById(profiles, profileId);
  }

  return null;
}

const getPageNameFromPath = (path) => {
  const name = getElementFromPath(path, 'pageName');
  if (name) {
    return name;
  }

  const page = path.match(PAGE_PATH_REGEX);
  if (page && page[1].length) {
    return page[2].length ? `${page[1]} ${page[2]}` : page[1];
  }

  return 'home';
};

const getChannelIfNeeded = ({ path, getState }) => {
  const match = path.match(PROFILE_PAGES_PATH_REGEX);
  if (match) {
    const { profiles } = getState().profiles;
    const channel = getProfileFromPath(path, profiles);
    return channel ? channel.service : null;
  }
  return null;
};

export { getPageNameFromPath, getChannelIfNeeded };
