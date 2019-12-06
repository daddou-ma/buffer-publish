const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'updateSchedule',
  'update schedule for profile',
  async ({ profileId, schedules }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/schedules/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          schedules,
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
    result.schedules = schedules;
    return Promise.resolve(result);
  }
);
