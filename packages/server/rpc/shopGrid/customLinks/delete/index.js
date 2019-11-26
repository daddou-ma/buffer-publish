const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'deleteCustomLink',
  'delete custom link for profile',
  async ({ profileId, customLinkId }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/custom_links/delete.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          id: customLinkId,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw createError({ message });
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result);
  }
);
