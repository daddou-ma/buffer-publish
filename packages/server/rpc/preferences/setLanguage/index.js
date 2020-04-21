const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'setUserLanguage',
  'saves the user language preference',
  ({ language }, { session }, res, { PublishAPI }) =>
    PublishAPI.post({
      uri: '1/user/update_user_language.json',
      session,
      params: {
        language,
      },
    })
      .then(response => response)
      .catch(PublishAPI.errorHandler)
);
