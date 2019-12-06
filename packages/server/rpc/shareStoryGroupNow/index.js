const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

const getMessage = message => {
  const isObject = typeof message === 'object' && message !== null;
  return isObject ? message.text : message;
};

module.exports = method(
  'shareStoryGroupNow',
  'share story group now',
  async ({ storyGroupId }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/story_groups/${storyGroupId}/share.json`,
        method: 'GET',
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
