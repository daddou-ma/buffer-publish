export const getSafeimageUrl = (url, width, height, fitImage) => {
  let safeImageUrl = 'https://safeimage.buffer.com/';
  safeImageUrl += (`${width}x${height}`);
  if (fitImage) {
    safeImageUrl += ',fit';
  }
  safeImageUrl += (`/${url}`);
  return safeImageUrl;
};
