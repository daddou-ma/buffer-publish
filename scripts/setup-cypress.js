/* eslint no-console: "off" */

const inquirer = require('inquirer');
const rp = require('request-promise');
const fs = require('fs');
const { join } = require('path');

console.log(`
Hello - this script will set up Cypress configuration so you can run E2E tests locally.
`);

async function run() {
  const { userEmail, userPassword = 'password' } = await inquirer.prompt([
    {
      type: 'list',
      name: 'userEmail',
      message: 'Choose user to run tests against:',
      choices: ['admin@bufferapp.com', 'Other...'],
    },
    {
      type: 'input',
      name: 'userEmail',
      message: 'Email:',
      askAnswered: true,
      when: answers => answers.userEmail === 'Other...',
    },
    {
      type: 'input',
      name: 'userPassword',
      message: 'Password:',
      when: answers => answers.userEmail !== 'admin@bufferapp.com',
    },
  ]);
  let result;
  try {
    result = await rp({
      method: 'GET',
      uri: `https://local.buffer.com/mock/getStandaloneSession?email=${userEmail}`,
      json: true,
      strictSSL: false,
    });
  } catch (e) {
    console.error('Unable to get user! Is buffer-web running locally?');
  }
  if (result === 'not found') {
    console.log('User not found!');
    process.exit();
  }
  const cypressEnvConfig = {
    API_ADDR: 'https://local.api.buffer.com',
    API_AT: result.publish.accessToken,
    PUBLISH_LOGIN_EMAIL: userEmail,
    PUBLISH_LOGIN_PASSWORD: userPassword,
  };
  fs.writeFileSync(
    join(__dirname, '..', 'cypress.env.json'),
    JSON.stringify(cypressEnvConfig, null, 2)
  );
  console.log(`
✅  Wrote config to cypress.env.json. Now try running: 

    yarn run cypress open
`);
}

run().catch(e =>
  console.log(
    'Something went wrong! Do you have the Publish API (web) running locally?\n\n',
    e
  )
);
