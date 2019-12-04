const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'switchPlan',
  'switch user plan',
  async ({ cycle, paymentMethodId, cta, plan }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/billing/start-or-update-subscription.json`,
        method: 'POST',
        strictSSL: process.env.NODE_ENV !== 'development',
        json: true,
        form: {
          cycle,
          payment_method_id: paymentMethodId,
          cta,
          access_token: session.publish.accessToken,
          product: 'publish',
          plan,
        },
      });
    } catch (response) {
      throw createError({
        message: response.error,
      });
    }
    return result;
  }
);
