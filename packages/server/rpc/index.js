const { rpc } = require('@bufferapp/buffer-rpc');
const recursiveReadDir = require('recursive-readdir');

const PublishAPI = require('../publishAPI');

async function loadMethods() {
  const methodModules = [];
  // Recursively grab all the `index.js` files for our methods
  const indexFiles = await recursiveReadDir(__dirname, ['!index.js']);
  indexFiles.forEach(methodIndex => {
    try {
      const module = require(methodIndex); // eslint-disable-line
      // Make sure it's an RPC Method (it will have a `name` and `fn`
      // from being wrapped by @bufferapp/buffer-rpc's `method` export.)
      if (module.name && module.fn) {
        methodModules.push(module);
      }
    } catch (e) {
      // eslint-disable-next-line
      console.error('Error loading RPC method:', methodIndex, e);
    }
  });
  return methodModules;
}

async function makeRPCHandler() {
  const methods = await loadMethods();
  return rpc([methods], { PublishAPI });
}

module.exports = makeRPCHandler;
