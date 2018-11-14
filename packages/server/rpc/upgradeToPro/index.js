const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'upgradeToPro',
  'upgrade user to the pro plan',
  async ({ cycle, token, cta }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/billing/start-or-update-subscription.json`,
        method: 'POST',
        strictSSL: process.env.NODE_ENV !== 'development',
        json: true,
        form: {
          cycle,
          cta: `publish-${cta}`,
          stripeToken: token,
          access_token: session.publish.accessToken,
          product: 'publish',
          plan: 'pro',
        },
      });
    } catch (response) {
      throw createError({
        message: response.error,
      });
    }
    return result;
  },
);
