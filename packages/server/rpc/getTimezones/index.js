const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'getTimezones',
  'get list of possible timezones',
  async ({ query }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/info/timezones.json`,
        method: 'GET',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
          q: query,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw createError({ message });
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result);
  }
);
