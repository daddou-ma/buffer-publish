const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'startTrial',
  'start trial',
  ({ profileId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/billing/start-trial.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        product: 'publish',
        plan: 'pro',
        cycle: 'month',
      },
    })
    .then(result => JSON.parse(result))
    .catch((err) => {
      if (err.error) {
        const { error } = JSON.parse(err.error);
        console.debug({error});
        throw createError({ message: error });
      }
    }),
  );
