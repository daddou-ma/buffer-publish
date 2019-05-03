const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'cancelTrial',
  'cancel trial',
  async ({ token }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/billing/cancel-trial.json`,
        method: 'POST',
        strictSSL: process.env.NODE_ENV !== 'development',
        json: true,
        form: {
          access_token: session.publish.accessToken,
          product: 'publish',
        },
      });
    } catch (response) {
      throw createError({
        message: JSON.stringify(response.error.error),
      });
    }
    return result;
  },
);
