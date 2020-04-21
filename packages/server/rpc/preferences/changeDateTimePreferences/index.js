const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { userParser } = require('../../../parsers/src');

module.exports = method(
  'changeDateTimePreferences',
  'update date time user preferences',
  (preferences, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/update.json`,
      method: 'POST',
      json: true,
      strictSSL: !(process.env.NODE_ENV === 'development'),
      form: Object.assign(preferences, {
        access_token: session.publish.accessToken,
      }),
    }).then(result => userParser(result.user))
);
