module.exports = ({ isProduction, isStandalone }) =>
  isProduction && !isStandalone
    ? '<script id="appcues-js" src="//fast.appcues.com/49463.js" async></script>'
    : '';
