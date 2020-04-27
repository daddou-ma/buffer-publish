const { getBugsnagScript } = require('../bugsnag');

module.exports = ({ isProduction, userId, isStandalone }) => {
  return isProduction ? getBugsnagScript({ userId, isProduction, isStandalone}) : '';
};
