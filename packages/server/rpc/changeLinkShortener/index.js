const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'changeLinkShortener',
  'change link shortener',
  async ({ profileId, domain }, { session }) => {
    let request;
    try {
      request = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/shorteners/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
          domain,
        },
      })
        .then(result => JSON.parse(result))
        .then(result => ({
          linkShorteners: result,
        }));
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw new Error(message);
      }
      throw err;
    }
    return request;
  }
);
