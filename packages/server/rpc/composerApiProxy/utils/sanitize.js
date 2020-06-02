// prevent ssrf attacks

// ensure it doesn't start with a slash
const sanitizePath = path => {
  if (path && path.charAt(0) === '/') {
    return path.substring(1);
  }
  return path;
};

// ensure it ends with a slash
const sanitizeApiUrl = apiUrl => {
  if (apiUrl && apiUrl.charAt(apiUrl.length - 1) !== '/') {
    return `${apiUrl}/`;
  }
  return apiUrl;
};

module.exports = {
  sanitizePath,
  sanitizeApiUrl,
};
