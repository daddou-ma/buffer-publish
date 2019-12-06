/**
 * This method attaches a convenience method to the window object so that
 * somenoe can simply type `showTracking()` into the console to start showing
 * tracking details.
 */
const attachToConsole = () => {
  if (typeof window === 'object') {
    window._showTracking = false;
    window.showTracking = function showTracking() {
      window._showTracking = !window._showTracking;
      // eslint-disable-next-line
      console.log(
        `%c[buffermetrics] %cTracking log ${
          window._showTracking ? 'enabled' : 'disabled'
        }`,
        'color: gray',
        'color: inherit'
      );
      return '';
    };
  }
};

export default attachToConsole;
