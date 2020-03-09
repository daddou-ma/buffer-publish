import { createError } from '@bufferapp/buffer-rpc';

/**
 * This method is designed to parse out an error response
 * from the Publish API which usually come back in the form of:
 *
 *   { error: "Some error message", code: 400 }
 *
 * If no message/code is found in the error response the original
 * exception is re-thrown.
 */
module.exports = error => {
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
};
