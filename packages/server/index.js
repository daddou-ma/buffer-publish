const isProduction = process.env.NODE_ENV === 'production';

/**
 * Add Datadog APM in production
 * This must come before importing any instrumented module.
 */
if (isProduction) {
  // eslint-disable-next-line
  require('dd-trace').init({
    env: 'production',
    hostname: process.env.DD_AGENT_HOST,
    service: process.env.DD_SERVICE_NAME,
    port: 8126,
    logInjection: true,
  });
}

const http = require('http');
const express = require('express');
const bufflog = require('@bufferapp/bufflog');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const shutdownHelper = require('@bufferapp/shutdown-helper');
const {
  setRequestSessionMiddleware,
  validateSessionMiddleware,
} = require('@bufferapp/session-manager');
const { errorMiddleware } = require('@bufferapp/buffer-rpc');
const helmet = require('helmet');

const apiError = require('./middlewares/apiError');
const controller = require('./lib/controller');
const makeRPCHandler = require('./rpc');
const checkToken = require('./rpc/checkToken');
const PublishAPI = require('./publishAPI');
const userParser = require('./parsers/src/userParser');
const userMethod = require('./rpc/user/index');
const profilesMethod = require('./rpc/profiles/index');
const pusherAuth = require('./lib/pusher');
const maintenanceHandler = require('./lib/maintenanceHandler');
const verifyAccessToken = require('./middlewares/verifyAccessToken');

const { setupFaviconRoutes } = require('./lib/favicon');
const { getBugsnagClient } = require('./lib/bugsnag');
const { getStaticAssets } = require('./lib/assets');
const getHtml = require('./lib/generateIndexHtml');

const app = express();
const server = http.createServer(app);

app.set('isProduction', isProduction);

if (isProduction) {
  app.set('bugsnag', getBugsnagClient());
}

app.use(bufflog.middleware());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet.frameguard({ action: 'sameorigin' }));

app.all('/maintenance', maintenanceHandler);
app.get('/health-check', controller.healthCheck);

app.use('*', (req, res, next) => {
  const analyzeApiAddr =
    req.get('ANALYZE-API-ADDR') || process.env.ANALYZE_API_ADDR;
  app.set('analyzeApiAddr', analyzeApiAddr);
  next();
});

// Favicon
setupFaviconRoutes(app, isProduction);

// All routes after this have access to the user session
app.use(
  setRequestSessionMiddleware({
    production: isProduction,
    sessionKeys: ['publish', 'global'],
  })
);

// Setup our RPC handler
(async () => {
  const rpcHandler = await makeRPCHandler();
  app.post('/rpc/:method?', checkToken, rpcHandler, errorMiddleware);
  app.use(apiError);
})();

// make sure we have a valid session
app.use(
  validateSessionMiddleware({
    production: isProduction,
    requiredSessionKeys: ['publish.accessToken', 'publish.foreignKey'],
  })
);
app.use(verifyAccessToken);

// Pusher Auth
app.post(
  '/pusher/auth',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  pusherAuth
);

const getNotificationFromQuery = query => {
  let notification = null;
  if (query.nt && query.nk) {
    notification = {
      type: query.nt, // Notification Type
      key: query.nk, // Notification Key
    };
    if (query.nv) {
      notification.variable = query.nv; // Notification Variable
    }
  }
  return notification;
};

const staticAssets = getStaticAssets({ isProduction });

/**
 * Primary Route
 *
 * Loads the web app, preloaded with some embedded scripts and userdata.
 */
app.get('*', (req, res) => {
  const notification = getNotificationFromQuery(req.query);
  const userId = req.session.publish.foreignKey;
  const modalKey = req.query.mk ? req.query.mk : null;
  const modalValue = req.query.mv ? req.query.mv : null;

  Promise.all([
    userMethod
      .fn(null, req, res, { PublishAPI, parsers: { userParser } })
      .catch(() => {
        // added catch incase we don't have any data in the object
        return undefined;
      }),
    profilesMethod.fn(null, req, res).catch(() => {
      // added catch incase we don't have any data in the object
      return undefined;
    }),
  ]).then(([user, profiles]) => {
    res.send(
      getHtml({
        isProduction,
        staticAssets,
        notification,
        userId,
        modalKey,
        modalValue,
        user,
        profiles,
      })
    );
  });
});

server.listen(80, () => console.log('listening on port 80')); // eslint-disable-line
server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 65 * 1000;

shutdownHelper.init({ server });
