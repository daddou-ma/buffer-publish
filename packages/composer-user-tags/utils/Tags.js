export const MAX_HEIGHT = 500;

export const getClientXY = userTags => {
  if (userTags && userTags.length > 0) {
    // get percentage position to display correctly with responsive image
    return userTags.map(tag => ({
      ...tag,
      clientX: tag.x * 100,
      clientY: tag.y * 100,
    }));
  }
  return userTags;
};

export const removeClientXY = tags =>
  tags.map(({ clientX, clientY, ...keepAttrs }) => keepAttrs);

export const getCoordinates = ({ e, media }) => {
  const rect = e.target.getBoundingClientRect();
  let { width, height } = media;
  if (height > MAX_HEIGHT) {
    width = (MAX_HEIGHT * width) / height;
    height = MAX_HEIGHT;
  }
  // final_width = max_height * start_width / start_height
  const x = (e.clientX - rect.left) / width;
  const y = (e.clientY - rect.top) / height;
  return {
    // get percentage to display correctly with responsive image
    clientX: x * 100,
    clientY: y * 100,
    x: x.toFixed(2),
    y: y.toFixed(2),
  };
};
