const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'requeuePost',
  'requeue post',
  async ({ updateId, profileId }, { session }) => {
    try {
      await rp({
        uri: `${process.env.API_ADDR}/1/updates/${updateId}/requeue.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw new Error(message);
      }
      throw err;
    }
    return 'OK';
  }
);
