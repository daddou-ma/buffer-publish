const rp = require('request-promise');

const get = ({ uri, session, params = {} }) => {
  return rp({
    uri: `${process.env.API_ADDR}/${uri}`,
    method: 'GET',
    json: true,
    strictSSL: !(process.env.NODE_ENV === 'development'),
    qs: {
      access_token: session.publish.accessToken,
      ...params,
    },
  });
};

module.exports = get;
