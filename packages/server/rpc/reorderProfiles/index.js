const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'reorderProfiles',
  'reorder profiles',
  async ({ order }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/reorder.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          order,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw new Error(message);
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result);
  }
);
