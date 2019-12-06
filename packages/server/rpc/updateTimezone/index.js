const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'updateTimezone',
  'update timezone for profile',
  async ({ profileId, timezone, city }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/update_timezone.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          timezone,
          timezone_city: city,
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
    result.newTimezone = city;
    return Promise.resolve(result);
  }
);
