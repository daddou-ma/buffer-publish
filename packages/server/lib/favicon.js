const fs = require('fs');
const { join } = require('path');

const resources = [
  { path: '/favicon.ico', contentType: 'image/x-icon' },
  { path: '/favicon-16x16.png', contentType: 'image/png' },
  { path: '/favicon-32x32.png', contentType: 'image/png' },

  { path: '/apple-touch-icon.png', contentType: 'image/png' },
  { path: '/safari-pinned-tab.svg', contentType: 'image/svg+xml' },
  { path: '/android-chrome-192x192.png', contentType: 'image/png' },
  { path: '/android-chrome-512x512.png', contentType: 'image/png' },
  { path: '/mstile-150x150.png', contentType: 'image/png' },

  { path: '/site.webmanifest', contentType: 'application/manifest+json' },
  { path: '/browserconfig.xml', contentType: 'application/xml' },
];

const sendFavicon = (req, res, contentType, isProduction) => {
  try {
    const img = fs.readFileSync(join(__dirname, '../favicons/', req.path));
    if (isProduction) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      res.setHeader(
        'Expires',
        new Date(Date.now() + 31536000000).toUTCString()
      );
    }
    res.set('Content-Type', contentType);
    res.send(img);
    res.end();
  } catch (e) {
    res.sendStatus(404);
  }
};

const setupFaviconRoutes = (app, isProduction) => {
  resources.forEach(resource => {
    app.get(resource.path, (req, res) =>
      sendFavicon(req, res, resource.contentType, isProduction)
    );
  });
};

const getFaviconCode = ({ cacheBust = 'v1' }) => `
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=${cacheBust}">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=${cacheBust}">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=${cacheBust}">
<link rel="manifest" href="/site.webmanifest?v=${cacheBust}">
<link rel="mask-icon" href="/safari-pinned-tab.svg?v=${cacheBust}" color="#2c4bff">
<meta name="apple-mobile-web-app-title" content="Publish">
<meta name="application-name" content="Publish">
<meta name="msapplication-TileColor" content="#2b5797">
<meta name="theme-color" content="#ffffff">
`;

module.exports = {
  setupFaviconRoutes,
  getFaviconCode,
};
