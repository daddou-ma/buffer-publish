const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { profileParser } = require('@bufferapp/publish-parsers');

module.exports = method(
  'single_profile',
  'fetch profiles',
  ({ profileId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        subprofiles: true,
        locked: true,
      },
    })
      .then(result => JSON.parse(result))
      .then(profile => profileParser(profile)),
);
