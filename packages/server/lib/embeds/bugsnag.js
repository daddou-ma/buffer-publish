const { getBugsnagScript } = require('../bugsnag');

module.exports = ({ isProduction, userId }) => {
  return isProduction ? getBugsnagScript(userId) : '';
};
