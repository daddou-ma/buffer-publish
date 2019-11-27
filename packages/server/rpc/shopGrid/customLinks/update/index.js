const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'updateCustomLinks',
  'update custom links for a profile',
  async (
    {
      profileId,
      customLinks,
      customLinkColor,
      customLinkContrastColor,
      customLinkButtonType,
    },
    { session }
  ) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/custom_links/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          custom_links: customLinks,
          custom_links_color: customLinkColor,
          custom_links_contrast_color: customLinkContrastColor,
          custom_links_button_type: customLinkButtonType,
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
    result.customLinks = customLinks;
    return Promise.resolve(result);
  }
);
