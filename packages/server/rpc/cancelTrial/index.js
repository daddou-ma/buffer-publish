const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method('cancelTrial', 'cancel trial', (_, { session }) =>
  rp({
    uri: `${process.env.API_ADDR}/1/billing/cancel-trial.json`,
    method: 'POST',
    strictSSL: !(process.env.NODE_ENV === 'development'),
    qs: {
      access_token: session.publish.accessToken,
      product: 'publish',
    },
  })
    .then(result => JSON.parse(result))
    .catch(err => {
      if (err.error) {
        const { error } = JSON.parse(err.error);
        throw createError({ message: error });
      }
    })
);
