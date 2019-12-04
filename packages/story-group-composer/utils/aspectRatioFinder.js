const getDivisor = ({ width, height }) =>
  height ? getDivisor({ width: height, height: width % height }) : width;

const getAspectRatio = (params = {}) => {
  const { width, height } = params;
  if (
    Number.isNaN(width) ||
    Number.isNaN(height) ||
    typeof width === 'undefined' ||
    typeof height === 'undefined' ||
    width === height
  ) {
    return '1:1';
  }

  const divisor = getDivisor({ width, height });

  return `${width / divisor}:${height / divisor}`;
};

export const InstagramStoriesAspectRatios = ['9:16', '16:9'];

export default getAspectRatio;
