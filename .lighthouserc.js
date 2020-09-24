module.exports = {
  ci: {
    collect: {
      url: ['https://publish.local.buffer.com/'],
      startServerCommand: 'sudo yarn run start:standalone-ci',
      startServerReadyPattern: /Publish is now running/,
      settings: {
        chromeFlags: '--ignore-certificate-errors',
      },
    },
    upload: {
      target: 'lhci',
    },
  },
};
