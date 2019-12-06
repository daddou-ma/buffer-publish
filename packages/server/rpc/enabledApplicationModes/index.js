const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

const getEnabledApplicationModes = (result, comprehensive) => {
  const applicationModes = result.application_modes;
  if (!applicationModes) return [];

  const enabledApplicationModes = [];
  Object.keys(applicationModes).forEach(mode => {
    const state = comprehensive
      ? applicationModes[mode].state
      : applicationModes[mode];
    if (state === 'enabled') {
      const modeObj = comprehensive ? applicationModes[mode] : mode;
      enabledApplicationModes.push(modeObj);
    }
  });
  return enabledApplicationModes;
};

module.exports = method(
  'enabledApplicationModes',
  'fetch enabled application modes',
  ({ comprehensive }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/i/info/application_modes.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        comprehensive,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => ({
        enabledApplicationModes: getEnabledApplicationModes(
          parsedResult,
          comprehensive
        ),
      }))
);
