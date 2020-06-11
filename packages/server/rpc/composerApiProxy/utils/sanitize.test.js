const { sanitizeApiUrl, sanitizePath } = require('./sanitize');

describe('utils/sanitize param path', () => {
  it('should not start with a slash', () => {
    const path = '/1/updates/create.json';
    const sanitizedPath = sanitizePath(path);
    expect(sanitizedPath).toBe('1/updates/create.json');
  });
  it('should return path if doesnt start with slash', () => {
    const path = '1/updates/create.json';
    const sanitizedPath = sanitizePath(path);
    expect(sanitizedPath).toBe(path);
  });
});

describe('utils/sanitize api url', () => {
  it('should end with a slash', () => {
    const url = 'https://local.api.bufferapp.com';
    const sanitizedUrl = sanitizeApiUrl(url);
    expect(sanitizedUrl).toBe('https://local.api.bufferapp.com/');
  });
  it('should return url if ends with slash', () => {
    const url = 'https://local.api.bufferapp.com/';
    const sanitizedUrl = sanitizeApiUrl(url);
    expect(sanitizedUrl).toBe(url);
  });
});