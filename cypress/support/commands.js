/* Temporary workaround:
 * Issue: Cypress doesn't currently suppport window.fetch
 * More info: https://github.com/cypress-io/cypress/issues/95#issuecomment-347607198
 */
Cypress.on('window:before:load', win => {
  win.fetch = null;
});
