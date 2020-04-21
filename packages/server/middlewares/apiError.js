const bufflog = require('@bufferapp/bufflog');

module.exports = (err, req, res) => {
  // eslint-disable-line no-unused-vars
  bufflog.error(`Publish API error: ${err.message}`, err);
  if (err.httpCode) {
    const filteredError = Object.assign({}, err);
    const { httpCode } = err;
    delete filteredError.httpCode;
    res.status(httpCode).send(filteredError);
  } else if (req.app.get('isProduction')) {
    req.app.get('bugsnag').notify(err, {
      originalUrl: req.originalUrl,
      user: { id: req.session.publish.foreignKey },
    });
    res.status(500).send({
      error:
        "Whoops something went wrong! We've been alerted and will be sure to take a look",
    });
  } else {
    res.status(500).send({
      error: err.message,
      stack: err.stack,
    });
  }
};
