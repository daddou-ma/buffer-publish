const rpCall = require('./rp');

const get = ({ uri, session, params = {} }) => {
  return rpCall({
    uri,
    method: 'GET',
    options: {
      qs: {
        access_token: session.publish.accessToken,
        ...params,
      },
    },
  });
};

module.exports = get;
