import { resizeImageIfNeeded } from '../../utils/DOMUtils';
import { InstagramThumbnailMaxSize } from '../../AppConstants';

const maxSize = InstagramThumbnailMaxSize;

describe('Resize images if needed', () => {
  it('should get resized when width is larger than max', () => {
    const video = { width: 800, height: 400 };
    const sizeObj = resizeImageIfNeeded(maxSize, video);
    const { width, height } = sizeObj;
    expect(width).toEqual(maxSize);
    expect(height).toBeLessThan(video.height);
  });
  it('should get resized when height is larger than max', () => {
    const video = { width: 400, height: 800 };
    const sizeObj = resizeImageIfNeeded(maxSize, video);
    const { width, height } = sizeObj;
    expect(height).toEqual(maxSize);
    expect(width).toBeLessThan(video.width);
  });
  it('sizes should stay the same if width and height are less than max', () => {
    const sizeObj = resizeImageIfNeeded(maxSize, { width: 500, height: 300 });
    const { width, height } = sizeObj;
    expect(width).toEqual(500);
    expect(height).toEqual(300);
  });
});
