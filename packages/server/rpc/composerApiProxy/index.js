const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'composerApiProxy',
  'communicate with buffer api',
  async ({ url, args, HTTPMethod = 'POST' }, { session }) => {
    let result;
    try {
      const fieldName = HTTPMethod === 'POST' ? 'form' : 'qs';
      const requestParams = {
        uri: `${process.env.API_ADDR}${url}`,
        method: HTTPMethod,
        strictSSL: process.env.NODE_ENV !== 'development',
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
