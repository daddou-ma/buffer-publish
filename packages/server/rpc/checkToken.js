const ObjectPath = require('object-path');

const whitelistedRPCNames = ['methods'];

module.exports = (req, res, next) => {
  const { name } = req.body;
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
