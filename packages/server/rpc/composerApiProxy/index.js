const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { sanitizeApiUrl, sanitizePath } = require('./utils/sanitize');

module.exports = method(
  'composerApiProxy',
  'communicate with buffer api',
  async (
    { url, args, HTTPMethod = 'POST' },
    { session, connection: { remoteAddress = undefined } }
  ) => {
    let result;
    try {
      const fieldName = HTTPMethod === 'POST' ? 'form' : 'qs';
      const sanitizedPath = sanitizePath(url);
      const sanitizedApiUrl = sanitizeApiUrl(process.env.API_ADDR);
      const requestParams = {
        uri: `${sanitizedApiUrl}${sanitizedPath}`,
        method: HTTPMethod,
        strictSSL: process.env.NODE_ENV !== 'development',
        headers: {
          'X-bufferproxy-forwarded-for': remoteAddress,
        },
      };
      requestParams[fieldName] = Object.assign(args, {
        access_token: session.publish.accessToken,
      });

      result = await rp(requestParams);
    } catch (err) {
      if (err.error) {
        // Catch and pass through Buffer API errors
        return Promise.resolve(JSON.parse(err.error));
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result);
  }
);
