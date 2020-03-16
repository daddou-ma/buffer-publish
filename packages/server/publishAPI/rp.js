const rp = require('request-promise');

const rpCall = ({ uri, method, options = {} }) => {
  return rp({
    uri: `${process.env.API_ADDR}/${uri}`,
    method,
    json: true,
    strictSSL: !(process.env.NODE_ENV === 'development'),
    ...options,
  });
};

module.exports = rpCall;
