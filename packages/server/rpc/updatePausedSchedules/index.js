const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'updatePausedSchedules',
  'update paused schedules for profile',
  async (
    {
      profileId,
      pausedSchedules,
      schedules,
      emptyPausedSchedules,
      showNotification,
    },
    { session }
  ) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/paused_schedules/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          paused_schedules: pausedSchedules,
          schedules,
          empty_paused_schedules: emptyPausedSchedules,
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
    result.pausedSchedules = pausedSchedules;
    result.showNotification = showNotification;
    return Promise.resolve(result);
  }
);
