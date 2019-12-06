const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'savePublishBetaRedirect',
  'save feature flip so user always comes to publish',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/publish/redirect.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
      .then(data => JSON.parse(data))
      .catch(err => {
        throw createError({ message: err.message });
      })
);
