const rp = require('request-promise');

const post = ({ uri, session, params = {} }) => {
  return rp({
    uri: `${process.env.API_ADDR}/${uri}`,
    method: 'POST',
    json: true,
    strictSSL: !(process.env.NODE_ENV === 'development'),
    form: {
      access_token: session.publish.accessToken,
      ...params,
    },
  });
};

module.exports = post;
