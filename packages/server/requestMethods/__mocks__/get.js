const get = jest.fn(response => {
  return Promise.resolve(response);
});

module.exports = get;
