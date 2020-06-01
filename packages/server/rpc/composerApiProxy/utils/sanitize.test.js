const { sanitizeApiUrl, sanitizeUrlParam } = require('./sanitize');

describe('utils/sanitize url param', () => {
  it('should not start with a slash', () => {
    const url = '/1/updates/create.json';
    const sanitizedUrl = sanitizeUrlParam(url);
    expect(sanitizedUrl).toBe('1/updates/create.json');
  });
  it('should return url if doesnt start with slash', () => {
    const url = '1/updates/create.json';
    const sanitizedUrl = sanitizeUrlParam(url);
    expect(sanitizedUrl).toBe(url);
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