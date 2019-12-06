const rp = require('request-promise');

function redirect(res, url) {
  res.redirect(307, url);
}

function isRequestingApp(req) {
  return req.method === 'GET' && req.accepts('text/html');
}

function shouldCheckToken(req) {
  return (
    !req.query.skipTokenCheck ||
    req.query.skipTokenCheck === 'true' ||
    parseInt(req.query.skipTokenCheck, 10) <= 3
  );
}

function isAccessTokenValid(req) {
  if (!req.session.publish.accessToken) {
    return true;
  }

  return rp({
    uri: `${process.env.API_ADDR}/1/user.json`,
    method: 'GET',
    strictSSL: !(
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ),
    qs: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      access_token: req.session.publish.accessToken,
      simplified_response: true,
    },
  })
    .then(r => true)
    .catch(r => false);
}

module.exports = async (req, res, next) => {
  // As this is a quite expensive check to perform, and we want the redirect to happen
  // before the app is rendered, we are processing it only on the first request.
  if (isRequestingApp(req) && shouldCheckToken(req)) {
    const isValid = await isAccessTokenValid(req);
    if (!isValid) {
      const loginServiceUrl =
        process.env.NODE_ENV !== 'production'
          ? 'https://login.local.buffer.com'
          : 'https://login.buffer.com';
      let skipTokenCheck;
      if (req.query.skipTokenCheck === 'true') {
        // Unblock people with skipTokenCheck=true
        skipTokenCheck = 2;
      } else if (req.query.skipTokenCheck) {
        skipTokenCheck = parseInt(req.query.skipTokenCheck, 10) + 1;
      } else skipTokenCheck = 1;
      if (skipTokenCheck > 3) {
        return redirect(res, `${loginServiceUrl}/logout`);
      }
      return redirect(
        res,
        `${loginServiceUrl}/login?skipImpersonation=true&redirect=https%3A%2F%2Fpublish.buffer.com%3FskipTokenCheck%3D${skipTokenCheck}`
      );
    }
  }

  next();
};
