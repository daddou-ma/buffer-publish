/**
 * TODO: mimic this logic from the `queue`
 * This method formats a list of posts into a list that contains day headings,
 * posts and Story tab queue slots
 */
const formatPostLists = ({
  posts,
}) => {
  const orderedPosts = Object.values(posts).sort((a, b) => a.due_at - b.due_at);

  // Now we'll start composing the list that will be passed to
  // our `QueueItems` component
  let finalList = [];
  return orderedPosts;
};

export default formatPostLists;
