const MAX_HEIGHT = 500;

export const getClientXY = ({ userTags, media }) => {
  let { width, height } = media;
  if (height > MAX_HEIGHT) {
    width = (MAX_HEIGHT * width) / height;
    height = MAX_HEIGHT;
  }
  if (userTags && userTags.length > 0) {
    return userTags.map(item => ({
      ...item,
      clientX: item.x * width,
      clientY: item.y * height,
    }));
  }
  return userTags;
};

export const removeClientXY = tags =>
  tags.map(({ clientX, clientY, ...keepAttrs }) => keepAttrs);
