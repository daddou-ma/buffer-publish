const { createError } = require('@bufferapp/buffer-rpc');

/**
 * This method is designed to parse out an error response
 * from the Publish API which usually come back in the form of:
 *
 *   { error: "Some error message", code: 400 }
 *
 * If no recognized error is found in the error response the original
 * exception is re-thrown.
 */
module.exports = response => {
  if (response.error) {
    // Some Publish API endpoints return a message
    if (response.error.message) {
      throw createError({
        message: response.error.message,
        code: response.statusCode,
      });
    }
    // Otherwise we expect an 'error' and possible 'code' fields
    throw createError({
      message: response.error.error,
      code: response.error.code || response.statusCode,
    });
  }
  throw response;
};
