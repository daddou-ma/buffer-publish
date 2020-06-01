// prevent ssrf attacks

// ensure it doesn't start with a slash
const sanitizeUrlParam = url => {
  if (url && url.charAt(0) === '/') {
    return url.substring(1);
  }
  return url;
};

// ensure it ends with a slash
const sanitizeApiUrl = apiUrl => {
  if (apiUrl && apiUrl.charAt(apiUrl.length - 1) !== '/') {
    return `${apiUrl}/`;
  }
  return apiUrl;
};

module.exports = {
  sanitizeUrlParam,
  sanitizeApiUrl,
};
