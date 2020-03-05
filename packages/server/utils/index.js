const { createError } = require('@bufferapp/buffer-rpc');

module.exports = {
  handleError: err => {
    if (err.error) {
      const { message } = JSON.parse(err.error);
      throw createError({ message });
    }
    throw err;
  },
};
