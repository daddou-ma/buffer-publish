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
      url: ['https://publish.local.buffer.com/'],
      startServerCommand: 'sudo yarn run start:standalone-ci',
      startServerReadyPattern: /Publish is now running/,
      settings: {
        chromeFlags: '--ignore-certificate-errors',
        emulatedFormFactor: 'desktop',
        throttling: desktopDense4G,
        /** The method used to throttle the network. */
        // throttlingMethod: 'devtools'|'simulate'|'provided';
        /** The throttling config settings. */
        // throttling: {} // ThrottlingSettings;
        /** If present, the run should only conduct this list of audits. */
        // onlyAudits: string[] | null;
        /** If present, the run should only conduct this list of categories. */
        // onlyCategories: string[] | null;
        /** If present, the run should skip this list of audits. */
        // skipAudits: string[] | null;
      },
    },
    upload: {
      target: 'lhci',
    },
  },
};
