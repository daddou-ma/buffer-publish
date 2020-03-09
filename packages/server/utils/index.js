const { createError } = require('@bufferapp/buffer-rpc');

module.exports = {
  handleError: err => {
    if (err.error) {
      let { message } = JSON.parse(err.error);

      if (!message) {
        message = JSON.parse(err.message);
      }

      throw createError({ message });
    }

    throw err;
  },
};
