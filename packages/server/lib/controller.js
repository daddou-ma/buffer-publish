const { isShutingDown } = require('@bufferapp/shutdown-helper');

const controller = module.exports;

controller.healthCheck = (req, res) => {
  if (isShutingDown()) {
    return res.status(500).json({ status: 'shutting down' });
  }
  res.status(200).json({ status: 'awesome' });
};
