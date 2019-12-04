const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { storyGroupParser } = require('./../../parsers/src');

module.exports = method(
  'updateStoryGroup',
  'fetch stories groups',
  ({ profileId, scheduledAt, storyGroupId, shareNow, stories }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/story_groups/update.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
      form: {
        profile_id: profileId,
        scheduled_at: scheduledAt,
        story_group_id: storyGroupId,
        share_now: shareNow,
        stories,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => {
        const storyGroup = storyGroupParser(parsedResult.data);
        return {
          storyGroup,
        };
      })
      .catch(err => {
        if (err) {
          const error = JSON.parse(err);
          throw createError({ message: error.message });
        }
      })
);
