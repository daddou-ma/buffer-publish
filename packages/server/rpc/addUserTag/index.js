const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'addUserTag',
  'add tag to user',
  ({ tag, name }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/add_tag.json`,
      method: 'POST',
      strictSSL: !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ),
      qs: {
        access_token: session.publish.accessToken,
        tag,
        name,
      },
    })
      .then(result => result.json())
      .catch(error => {
        const { body: apiErrorResponse } = error.response;
        let parsedError;
        try {
          parsedError = JSON.parse(apiErrorResponse);
        } catch (e) {
          // Throw original error
          throw error;
        }
        throw createError({
          message: parsedError.error,
          code: parsedError.code,
        });
      })
);
