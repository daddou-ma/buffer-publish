const rpCall = require('./rp');

const post = ({ uri, session, params = {} }) => {
  return rpCall({
    uri,
    method: 'POST',
    options: {
      form: {
        access_token: session.publish.accessToken,
        ...params,
      },
    },
  });
};

module.exports = post;
