const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'shortenUrl',
  'fetch service posts',
  ({ profileId, url }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/links/shorten.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        profile_id: profileId,
        url,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => ({
        shortUrl: parsedResult.url,
        longUrl: parsedResult.long_url,
      }))
);
