const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'clientAccess',
  'fetch profiles client access token',
  ({ profileId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/get_client_access.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        subprofiles: true,
        locked: true,
      },
    }).then(result => JSON.parse(result))
);
