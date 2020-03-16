const ObjectPath = require('object-path');

const whitelistedRPCNames = ['methods'];

module.exports = (req, res, next) => {
  // Try to get the method name from the URL first (e.g., /rpc/:method)
  // Fall back to checking the POST body for the method name.
  const name = req.params.method ? req.params.method : req.body.name;
  if (
    whitelistedRPCNames.includes(name) ||
    ObjectPath.has(req, 'session.publish')
  ) {
    return next();
  }
  const error = 'Unauthorized';
  res.statusMessage = error;
  res.status(401).send({
    error,
  });
};
