const post = jest.fn(response => {
  return Promise.resolve(response);
});

module.exports = post;
