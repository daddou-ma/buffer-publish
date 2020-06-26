const getHumanReadableSize = bytes => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]}`;

  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

const getHumanReadableTime = unformattedSeconds => {
  let minutes = Math.floor(unformattedSeconds / 60);
  let seconds = unformattedSeconds - minutes * 60;

  if (seconds < 10) seconds = `0${seconds}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${minutes}:${seconds}`;
};

const getFileTypeFromPath = path => {
  const fileNameParts = path.split('.');
  return fileNameParts[fileNameParts.length - 1];
};

/**
 * Return a random id. If an array of existing ids is passed, it'll ensure
 * the returned id is unique.
 */
const generateUniqueId = (existingIds = []) => {
  let id;

  do {
    id = Math.floor(Math.random() * Math.pow(10, 10)).toString(36);
  } while (existingIds.includes(id));

  return id;
};

const getAbsoluteUrl = link => {
  if (!link.includes('http://') && !link.includes('https://')) {
    link = `http://${link}`;
  }
  return link;
};

/**
 * Take advantage of the String iterator working with full unicode symbols rather than
 * surrogate pairs to make unicode-aware computations.
 *
 * getUnicodeAwareLength(str) returns the unicode-aware length of a string.
 * makeUnicodeAwareIndexUnaware(str, i) when given a unicode-aware index in a string,
 * returns its unicode-unaware counterpart.
 */
const getUnicodeAwareLength = str => [...str].length;
const makeUnicodeAwareIndexUnaware = (str, i) =>
  Array.from(str)
    .slice(0, i)
    .join('').length;

/**
 * Escape parens in a string. Useful for CSS style tags, where external resources
 * linked using `url()` have parens acting as special characters.
 */
const cachedParensRegex = /(\(|\))/g;
const escapeParens = str => str?.replace(cachedParensRegex, '\\$1');

const getDomainFromUrl = url =>
  url.replace(/(?:(?:https?|ftp):\/\/)?(?:www\.)?/, '').split(/[/?#]/)[0];

const getBaseUrl = () =>
  window.location.hostname === 'publish.local.buffer.com'
    ? 'https://local.buffer.com'
    : 'https://buffer.com';

const removeLinkFromErrorMessageText = (text, linkClass) => {
  const rx = new RegExp(`<a class="${linkClass}".*?<\/a>`);
  return text.replace(rx, '');
};

export {
  getHumanReadableSize,
  getHumanReadableTime,
  getFileTypeFromPath,
  escapeParens,
  getAbsoluteUrl,
  generateUniqueId,
  getUnicodeAwareLength,
  makeUnicodeAwareIndexUnaware,
  getDomainFromUrl,
  removeLinkFromErrorMessageText,
  getBaseUrl,
};
