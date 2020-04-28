const fs = require('fs');
const path = require('path');

const pathToStandaloneSession = path.join(
  __dirname,
  '..',
  '..',
  'packages',
  'server',
  'standalone',
  'standalone-session.json'
);

/**
 * https://github.com/archfz/cypress-terminal-report
 */
module.exports = on => {
  // eslint-disable-next-line global-require
  require('cypress-terminal-report').installPlugin(on);

  on('task', {
    getAccessToken: () => {
      const session = JSON.parse(
        fs.readFileSync(pathToStandaloneSession, 'UTF-8')
      );
      return session.publish.accessToken;
    },
    writeStandaloneSession: data => {
      fs.writeFileSync(pathToStandaloneSession, JSON.stringify(data, null, 2));
      return true;
    },
  });
};
