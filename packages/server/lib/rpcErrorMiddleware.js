/**
 * This middleware copied and modified from
 * https://github.com/bufferapp/buffer-rpc/blob/main/src/errorMiddleware.js
 */
module.exports = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  /**
   * Also return the stacktrace of the error when local or standalone.
   */
  let stack = false;
  const shouldHaveStack =
    !req.app.get('isProduction') || req.app.get('isStandalone');
  if (shouldHaveStack) {
    const rawStack = error.stack;
    const stackLines = rawStack.split('\n');
    stack = stackLines.map(line => line.replace(/\/((.*?)buffer-publish)/, ''));
  }

  res.status(500).send({
    error: error.message,
    code: 5000,
    stack,
    handled: false,
  });
};
