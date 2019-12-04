const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'twoFactorRecovery',
  'fetch tfa recovery code',
  async (_, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/user/twofactor/recovery.json`,
        method: 'POST',
        json: true,
        strictSSL: !(
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
        ),
        form: {
          access_token: session.publish.accessToken,
        },
      });
    } catch (err) {
      if (err.error) {
        const { error } = err.error;
        throw createError({
          message: error,
        });
      }
      throw err;
    }
    return Promise.resolve(result);
  }
);
