const constants = require('lighthouse/lighthouse-core/config/constants');

/**
 * @todo Consider adding performance budgets
 * https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#budgetsjson
 */

module.exports = {
  ci: {
    collect: {
      // The URL is added when run in CI / GitHub Actions (it's passed as a CLI param)
      // url: ['https://publish.buffer.com/'],

      // Login to Buffer with Luna Sneakers account
      puppeteerScript: './lighthouse-puppeteer-login.js',

      // This replaces the dev URL with the regular publish URL, so we can
      // compare across branches without seeing the URLs as different
      // https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#urlreplacementpatterns
      urlReplacementPatterns: ['s#(//.*?)-publish\\.dev#//publish#'],

      // Emulate a standard desktop
      // https://github.com/GoogleChrome/lighthouse/blob/master/docs/emulation.md
      settings: {
        formFactor: 'desktop',
        throttling: constants.throttling.desktopDense4G,
        screenEmulation: constants.screenEmulationMetrics.desktop,
        emulatedUserAgent: constants.userAgents.desktop,
      },
    },
    upload: {
      target: 'lhci',
      // rest of config passed via CLI params in CI
    },
  },
};
