const http = require('http');
const express = require('express');
const logMiddleware = require('@bufferapp/logger/middleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const { join } = require('path');
const shutdownHelper = require('@bufferapp/shutdown-helper');
const { apiError } = require('./middleware');
const {
  setRequestSessionMiddleware,
  validateSessionMiddleware,
} = require('@bufferapp/session-manager');
const bufferMetricsMiddleware = require('@bufferapp/buffermetrics/middleware');
const { errorMiddleware } = require('@bufferapp/buffer-rpc');
const controller = require('./lib/controller');
const rpcHandler = require('./rpc');
const checkToken = require('./rpc/checkToken');
const pusher = require('./lib/pusher');
const maintenanceHandler = require('./maintenanceHandler');
const { sendFavicon } = require('./lib/favicon');
const { getBugsnagClient, getBugsnagScript } = require('./lib/bugsnag');
const serialize = require('serialize-javascript');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const multiBodyParser = multer();
const composerAjaxBuffemetrics = require('./lib/composerAjaxBuffermetrics');

// Favicon
app.get(
  '/favicon.ico',
  (req, res) => sendFavicon(req, res, 'ico'),
);

app.get(
  /\/favicon-(16|32)\.png/,
  (req, res) => sendFavicon(req, res, 'png'),
);

let staticAssets = {
  'bundle.js': 'https://local.buffer.com:8080/static/bundle.js',
  'bundle.css': 'https://local.buffer.com:8080/static/bundle.css',
  'vendor.js': 'https://local.buffer.com:8080/static/vendor.js',
};

const isProduction = process.env.NODE_ENV === 'production';
app.set('isProduction', isProduction);

if (isProduction) {
  staticAssets = JSON.parse(fs.readFileSync(join(__dirname, 'staticAssets.json'), 'utf8'));

  // Ensure that static assets is not empty
  if (Object.keys(staticAssets).length === 0) {
    console.log('Failed loading static assets manifest file - File is empty'); // eslint-disable-line
    process.exit(1);
  }
}

/**
 * Add Bugsnag to app (see `middleware.js` for where this is used)
 */
if (isProduction) {
  app.set('bugsnag', getBugsnagClient());
}

const stripePublishableKey = process.env.STRIPE_PUBLISHABLE;

const notificationScript = (notification) => {
  if (!notification) {
    return '';
  }

  let variable = '';

  if (notification.variable) {
    variable = `variable: ${serialize(notification.variable, { isJSON: true })}`;
  }

  return `
    <script type="text/javascript">
        window._notification = {
          type: ${serialize(notification.type, { isJSON: true })},
          key: ${serialize(notification.key, { isJSON: true })},
          ${variable}
        };
    </script>
  `;
};

const showModalScript = key => (
  key ? `
    <script type="text/javascript">
        window._showModal = {
          key: ${serialize(key, { isJSON: true })}
        };
    </script>
  ` : ''
);

const stripeScript = `<script src="https://js.stripe.com/v2/"></script>
<script type="text/javascript">
    Stripe.setPublishableKey('${stripePublishableKey}');
</script>
`;

const fullStoryScript = `<script>
window['_fs_debug'] = false;
window['_fs_host'] = 'fullstory.com';
window['_fs_org'] = '9F6GW';
window['_fs_namespace'] = 'FS';
(function(m,n,e,t,l,o,g,y){
  if (e in m) {if(m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].');} return;}
  g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
  o=n.createElement(t);o.async=1;o.src='https://'+_fs_host+'/s/fs.js';
  y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
  g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
  g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
  g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[\`;\`]*\`[\`;\`]*\`[\`;\`]*\`')){
  d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+
  ';path=/;expires='+new Date(0).toUTCString();i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}};
})(window,document,window['_fs_namespace'],'script','user');
</script>`;

const getHtml = ({ notification, userId, modalKey }) =>
  fs
    .readFileSync(join(__dirname, 'index.html'), 'utf8')
    .replace('{{{vendor}}}', staticAssets['vendor.js'])
    .replace('{{{bundle}}}', staticAssets['bundle.js'])
    .replace('{{{bundle-css}}}', staticAssets['bundle.css'])
    .replace('{{{stripeScript}}}', stripeScript)
    .replace('{{{fullStoryScript}}}', fullStoryScript)
    .replace('{{{bugsnagScript}}}', isProduction ? getBugsnagScript(userId) : '')
    .replace('{{{notificationScript}}}', notificationScript(notification))
    .replace('{{{showModalScript}}}', showModalScript(modalKey));

app.use(logMiddleware({ name: 'BufferPublish' }));
app.use(cookieParser());

app.all('/maintenance', maintenanceHandler);

// All routes after this have access to the user session
app.use(
  setRequestSessionMiddleware({
    production: isProduction,
    sessionKeys: ['publish', 'global'],
  }),
);

app.use(bodyParser.json());

app.post('/rpc', checkToken, rpcHandler, errorMiddleware);

app.use(
  bufferMetricsMiddleware({
    name: 'Buffer-Publish',
    debug: !isProduction,
    trackVisits: true,
  }),
);

/**
 * The composer expects this URL to exist and accept
 * metrics data. It does on buffer-web, but not here
 * in publish, so we create it here.
 */
app.post('/ajax/buffermetrics',
  // needed to parse the multipart FormData
  multiBodyParser.fields([]),
  composerAjaxBuffemetrics,
);

// make sure we have a valid session
app.use(
  validateSessionMiddleware({
    production: isProduction,
    requiredSessionKeys: ['publish.accessToken', 'global.userId'],
  }),
);

app.get('/health-check', controller.healthCheck);

// Pusher Auth
app.post(
  '/pusher/auth',
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  },
);

const getNotificationFromQuery = (query) => {
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

app.get('*', (req, res) => {
  const notification = getNotificationFromQuery(req.query);
  const userId = req.session.global.userId;
  const modalKey = req.query.mk ? req.query.mk : null;
  res.send(getHtml({
    notification,
    userId,
    modalKey,
  }));
});

app.use(apiError);

server.listen(80, () => console.log('listening on port 80')); // eslint-disable-line

shutdownHelper.init({ server });
