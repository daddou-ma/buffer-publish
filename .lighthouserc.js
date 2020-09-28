/**
 * @todo Consider adding performance budgets
 * https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#budgetsjson
 */

// https://github.com/GoogleChrome/lighthouse/blob/bc6ab76a33f50403e4bfc84eb069b070ed10466f/lighthouse-core/config/constants.js#L43-L51
// Using a "broadband" connection type
const desktopDense4G = {
  rttMs: 40,
  throughputKbps: 10 * 1024,
  cpuSlowdownMultiplier: 1,
  requestLatencyMs: 0, // 0 means unset
  downloadThroughputKbps: 0,
  uploadThroughputKbps: 0,
};

module.exports = {
  ci: {
    collect: {
      // URL added when run in CI (GitHub Actions)
      // url: ['https://publish.buffer.com/'],
      
      // Login to Buffer with Luna Sneakers account
      puppeteerScript: './lighthouse-puppeteer-login.js',

      // This replaces the dev URL with the regular publish URL, so we can
      // compare across branches without seeing the URLs as different
      // https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/configuration.md#urlreplacementpatterns
      urlReplacementPatterns: ['s#(//.*?)-publish\\.dev#//publish#'],

      // Emulate a standard desktop
      settings: {
        emulatedFormFactor: 'desktop',
        throttling: desktopDense4G,
      },
    },
    upload: {
      target: 'lhci',
      // rest of config passed via CLI params in CI
    },
  },
};
