const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'twoFactorConfirm',
  'confirm tfa settings',
  async ({ code, initKey, tfaMethod, tel, edit }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/user/twofactor/confirm.json`,
        method: 'POST',
        json: true,
        strictSSL: !(
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
        ),
        form: {
          access_token: session.publish.accessToken,
          method: tfaMethod,
          init_key: initKey,
          code,
          tel,
          edit,
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
