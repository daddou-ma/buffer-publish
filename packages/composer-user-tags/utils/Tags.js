export const MAX_HEIGHT = 500;
export const DEFAULT_COORDINATE = 0;

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

const isNumberValid = coordinate => Number.isFinite(coordinate);

// set value to default if not valid (Infinite)
export const getValidNumber = coordinate =>
  isNumberValid(coordinate) ? coordinate : DEFAULT_COORDINATE;

export const getCoordinates = ({ e, media }) => {
  const rect = e.target.getBoundingClientRect();
  let { width, height } = media;
  if (height > MAX_HEIGHT) {
    width = (MAX_HEIGHT * width) / height;
    height = MAX_HEIGHT;
  }
  // final_width = max_height * start_width / start_height
  const calculatedWidth = (e.clientX - rect.left) / width;
  const calculatedHeight = (e.clientY - rect.top) / height;

  // keep decimals fixed to 2
  const x = getValidNumber(calculatedWidth).toFixed(2);
  const y = getValidNumber(calculatedHeight).toFixed(2);
  // add * to get percentage to display correctly with responsive image
  const clientX = getValidNumber(calculatedWidth * 100);
  const clientY = getValidNumber(calculatedHeight * 100);

  return { clientX, clientY, x, y };
};
