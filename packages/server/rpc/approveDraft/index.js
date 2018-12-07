const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'approveDraft',
  'approve and move draft to queue',
  ({ updateId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/updates/${updateId}/approve.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
    .then(result => JSON.parse(result))
    .catch((err) => {
      throw createError({ message: err.message });
    }),
);
