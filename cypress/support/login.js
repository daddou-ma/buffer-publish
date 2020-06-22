/* eslint no-console: "off" */

const email = Cypress.env('PUBLISH_LOGIN_EMAIL') || 'admin@bufferapp.com';
const password = Cypress.env('PUBLISH_LOGIN_PASSWORD') || 'password';

const LOCAL_LOGIN_URL = 'https://login.local.buffer.com/login';

Cypress.Commands.add('loginWithCSRF', csrfToken => {
  cy.request({
    method: 'POST',
    url: LOCAL_LOGIN_URL,
    failOnStatusCode: false, // dont fail so we can make assertions
    form: true, // we are submitting a regular form body
    body: {
      email,
      password,
      _csrf: csrfToken, // insert this as part of form body
    },
  });
});

Cypress.Commands.add('login', () => {
  /** Skip logging if Publish is running in standalone mode (i.e., already has a preloaded session) */
  if (Cypress.env('STANDALONE') === true) {
    return true;
  }
  cy.request(LOCAL_LOGIN_URL)
    .its('body')
    .then(body => {
      const $html = Cypress.$(body);
      const csrf = $html.find('input[name=_csrf]').val();

      cy.loginWithCSRF(csrf).then(resp => {
        expect(resp.status).to.eq(200);
      });
    });
});

const getRandomText = () => {
  return Math.random()
    .toString(36)
    .substring(7);
};

Cypress.Commands.add('createTestUser', () => {
  /**
   * Skip creating a test user if we're not running in standalone mode.
   * This means we're probably running Cypress locally and will login with a local user.
   * (See commands above.)
   */
  if (Cypress.env('STANDALONE') !== true) {
    return true;
  }
  cy.task('getAccessToken').then(accessToken => {
    const at = Cypress.env('API_AT') || accessToken; // use env specified token if present
    cy.fixture('pro-user').then(proUser => {
      const randomEmail = `cypress-e2e-test-user-${getRandomText()}@buffer.com`;
      console.log('Creating user with email', randomEmail);
      const user = {
        password: getRandomText(),
        email: randomEmail,
        ...proUser,
      };
      cy.request({
        method: 'POST',
        url: `${Cypress.env(
          'API_ADDR'
        )}/1/e2e/create-test-user.json?access_token=${at}`,
        body: user,
      })
        .its('body')
        .then(body => {
          // Write the standalone-session.json file so that Publish is logged in
          // as our newly created test user.
          cy.task('writeStandaloneSession', body.standalone_session);
        });
    });
  });
});
