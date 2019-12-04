import { ImageDimensions } from '@bufferapp/publish-constants';

export const getSafeimageUrl = (url, width, height, fitImage = false) => {
  let safeImageUrl = 'https://safeimage.buffer.com/';
  safeImageUrl += `${width}x${height}`;
  if (fitImage) {
    safeImageUrl += ',fit';
  }
  safeImageUrl += `/${url}`;
  return safeImageUrl;
};

export const getLargeSafeImageUrl = (url, fitImage) => {
  const { width, height } = ImageDimensions.large;
  return getSafeimageUrl(url, width, height, fitImage);
};
