module.exports = {
  ci: {
    collect: {
      url: ['https://publish.local.buffer.com/'],
      startServerCommand: 'yarn run start:standalone-ci',
      startServerReadyPattern: /Publish is now running/,
    },
    upload: {
      target: 'lhci',
    },
  },
};
