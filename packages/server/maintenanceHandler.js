const fs = require('fs');
const { join } = require('path');
const rp = require('request-promise');

const getMaintenanceHtml = () =>
  fs.readFileSync(join(__dirname, 'maintenance.html'), 'utf8');

module.exports = (req, res, next) => {
  rp({
    uri: `${process.env.API_ADDR}`,
    method: 'GET',
    strictSSL: !(process.env.NODE_ENV === 'development'),
  })
    .then(() => {
      // we're out of maintenance mode, redirect to app
      res.redirect(302, '/');
    })
    .catch(error => {
      if (
        error.error.includes(
          'Buffer is under maintenance, please, try again soon'
        )
      ) {
        res.send(getMaintenanceHtml());
      } else {
        next(error);
      }
    });
};
