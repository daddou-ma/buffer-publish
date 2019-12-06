module.exports = posts => {
  const postMap = {};
  posts.forEach(post => {
    postMap[post.id] = post;
  });
  return postMap;
};
