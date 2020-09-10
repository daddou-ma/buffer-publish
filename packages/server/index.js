const isProduction = process.env.NODE_ENV === 'production';
const isStandalone = process.env.STANDALONE === 'true';
const usePrecompiledBundles = process.env.USE_PRECOMPILED_BUNDLES === 'true';

const standalone = require('./standalone'); // eslint-disable-line
if (isStandalone) {
  standalone.loadEnv();
  standalone.serveStaticAssets();
}

/**
 * Add Datadog APM in production
 * This must come before importing any instrumented module.
 */
if (isProduction && !isStandalone) {
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
const pusherAuth = require('./lib/pusher');
const maintenanceHandler = require('./lib/maintenanceHandler');
const verifyAccessToken = require('./middlewares/verifyAccessToken');

const { getBugsnagClient } = require('./lib/bugsnag');

// No nginx reverseproxy in standalone mode, so we need to do SSL
// If not standalone, then 80 when running local (Docker) or 3000
// when running in production.
// eslint-disable-next-line no-nested-ternary
const PORT = isStandalone ? 443 : !isProduction ? 80 : 3000;

const app = express();
const server = isStandalone
  ? standalone.createServer(app)
  : http.createServer(app);

app.set('isProduction', isProduction);

if (isProduction && !isStandalone) {
  app.set('bugsnag', getBugsnagClient());
}

/**
 * Don't use logging middleware in standalone mode –
 * Keeps the terminal cleaner and reduces noise.
 */
if (!isStandalone) {
  app.use(bufflog.middleware());
}

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

if (isStandalone) {
  // Use a static session
  app.use(standalone.setStandaloneSessionMiddleware);
} else {
  // All routes after this have access to the user session
  app.use(
    setRequestSessionMiddleware({
      production: isProduction,
      sessionKeys: ['*'],
    })
  );
}

// Setup our RPC handler
(async () => {
  const rpcHandler = await makeRPCHandler();
  app.post('/rpc/:method?', checkToken, rpcHandler, errorMiddleware);
  app.use(apiError);
})();

// make sure we have a valid session
if (!isStandalone) {
  app.use(
    validateSessionMiddleware({
      production: isProduction,
      requiredSessionKeys: ['publish.accessToken', 'publish.foreignKey'],
    })
  );
  app.use(verifyAccessToken);
}

// Pusher Auth
app.post(
  '/pusher/auth',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  pusherAuth
);

server.listen(PORT, () => {
  if (isStandalone) {
    standalone.onBoot({ usePrecompiledBundles });
  } else {
    console.log(`listening on port ${PORT}`); // eslint-disable-line
  }
});

// These help prevent issues running Node 12 in production
server.keepAliveTimeout = 61 * 1000;
server.headersTimeout = 65 * 1000;

shutdownHelper.init({ server });
