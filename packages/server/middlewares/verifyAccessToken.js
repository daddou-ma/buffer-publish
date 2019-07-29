const rp = require('request-promise');

function redirect (res, url) {
  res.redirect(307, url);
}

function isRequestingApp(req) {
  return req.method === 'GET' && req.accepts('text/html');
}

function isAccessTokenValid(req) {
  if (!req.session.publish.accessToken) {
    return true;
  }

  return rp({
    uri: `${process.env.API_ADDR}/1/user/convert_access_token.json`,
    method: 'POST',
    strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
    qs: {
      access_token: req.session.publish.accessToken,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    },
  })
    .then(r => true)
    .catch(r => false);
}

module.exports = async (req, res, next) => {
  // As this is a quite expensive check to perform, and we want the redirect to happen
  // before the app is rendered, we are processing it only on the first request.
  if (isRequestingApp(req)) {
    const isValid = await isAccessTokenValid(req);
    if (!isValid) {
      return redirect(res, 'https://login.buffer.com/login?redirect=https://publish.buffer.com?skipImpersonation=true');
    }
  }

  next();
};
