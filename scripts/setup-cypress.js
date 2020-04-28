/* eslint no-console: "off" */

const inquirer = require('inquirer');
const rp = require('request-promise');
const fs = require('fs');
const { join } = require('path');

console.log(`
Hello - this script will set up Cypress configuration so you can run E2E tests locally.
`);

async function run() {
  const { userEmail } = await inquirer.prompt([
    {
      type: 'list',
      name: 'userEmail',
      message: 'Choose user to run tests against:',
      choices: ['admin@bufferapp.com', 'Other...'],
    },
    {
      type: 'input',
      name: 'userEmail',
      message: 'Okay, what local user email should we use?',
      askAnswered: true,
      when: answers => answers.userEmail === 'Other...',
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
  }
  const cypressEnvConfig = {
    env: {
      API_ADDR: 'https://local.api.buffer.com',
      API_AT: result.publish.accessToken,
    },
  };
  fs.writeFileSync(
    join(__dirname, '..', 'cypress.env.json'),
    JSON.stringify(cypressEnvConfig, null, 2)
  );
  console.log('✅  Done!');
}

run();
