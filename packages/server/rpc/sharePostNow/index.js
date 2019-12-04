const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

const getMessage = message => {
  const isObject = typeof message === 'object' && message !== null;
  return isObject ? message.text : message;
};

module.exports = method(
  'sharePostNow',
  'share post now',
  async ({ updateId, profileId }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/updates/${updateId}/share.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw createError({
          message: getMessage(message),
        });
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result);
  }
);
