const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'revokeConnectedApp',
  'revokes connected app',
  ({ appId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/clients/${appId}/revoke.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      form: {
        access_token: session.publish.accessToken,
      },
    })
      .then(data => JSON.parse(data))
      .catch(err => {
        throw createError({ message: err.message });
      })
);
