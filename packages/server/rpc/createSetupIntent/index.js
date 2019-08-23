const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

const strictSSL = !(process.env.NODE_ENV === 'development');

module.exports = method(
  'createSetupIntent',
  'create a setup intent in Stripe',
  ({ session }) => rp({
    uri: `${process.env.API_ADDR}/1/billing/create-setup-intent.json`,
    method: 'POST',
    strictSSL,
    qs: {
      access_token: session.publish.accessToken,
    },
  })
    .then(result => JSON.parse(result))
    .catch((err) => {
      if (err.error) {
        const { error } = JSON.parse(err.error);
        throw createError({ message: error });
      }
    }),
);
