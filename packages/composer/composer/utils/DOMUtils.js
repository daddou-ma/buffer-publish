/* globals Bugsnag */

const getElRefOffset = (el, dir = 'top', ref = document.body) => {
  const offsetPosMethodName = dir !== 'left' ? 'offsetTop' : 'offsetLeft';
  let offset = el[offsetPosMethodName];

  // eslint-disable-next-line no-cond-assign
  while (el.offsetParent !== null && (el = el.offsetParent) !== ref) {
    offset += el[offsetPosMethodName];
  }

  return offset;
};

const getStillDataUriFromGif = gifUrl =>
  new Promise((resolve, reject) => {
    const image = new Image();

    const getStillDataUri = () => {
      const canvas = document.createElement('canvas');

      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);

      const stillDataUri = canvas.toDataURL('image/png');
      resolve(stillDataUri);
    };

    image.addEventListener('load', getStillDataUri);
    image.addEventListener('error', () => {
      // TODO: Monitor still gif creation error events in Datadog
      reject();
    });
    image.crossOrigin = 'anonymous';
    image.src = gifUrl;
  });

/**
 * Note: reused from other project, will be good the refactor the logic and make it clearer
 *
 * Scroll elements into view, horizontally or vertically, when Element.scrollIntoView()
 * doesn't do exactly what we want (e.g. it doesn't always make an el entirely visible
 * if it already partly is).
 *
 * Takes parameters as an object:
 * - Mandatory:
 *   - el: the element to scroll into view (can optionally be replaced with
 *     param.offsets if these numbers are already known)
 *   - ref: the reference element (i.e. the one with the scrollbar) (must be
 *     a valid offset parent – body, table, th, td, or any positioned parent – when
 *     param.el isn't replaced with param.offsets)
 * - Optional:
 *   - axis: 'horizontal' or 'vertical' (default)
 *   - padding: padding to be left around param.el after scrolling (default: 0)
 */
const scrollIntoView = (() => {
  const scrollElIntoView = function(ref, axis, elOffsets, elSize, padding) {
    const scrollPosPropName = axis === 'vertical' ? 'scrollTop' : 'scrollLeft';
    const refSize = axis === 'vertical' ? ref.offsetHeight : ref.offsetWidth;
    const elOuterSize = elSize + padding * 2;

    // Too large to fit in the ref? Position it so as to fill the ref
    if (elOuterSize > refSize) {
      ref[scrollPosPropName] = elOffsets[0] + (elOuterSize - refSize) / 2;
      return;
    }

    const refScrollPos = ref[scrollPosPropName];

    // Align to top/left?
    let diff = refScrollPos - elOffsets[0] + padding;
    if (diff > 0) {
      ref[scrollPosPropName] -= diff;
      return;
    }

    // Or align to bottom/right?
    diff = elOffsets[1] - (refScrollPos + refSize) + padding;
    if (diff > 0) ref[scrollPosPropName] += diff;

    // Or do nothing
  };

  return function(param) {
    param.padding = param.padding || 0;
    param.axis = param.axis === 'horizontal' ? 'horizontal' : 'vertical';

    let firstOffset;

    if (param.el) {
      param.elSize =
        param.axis === 'vertical'
          ? param.el.offsetHeight
          : param.el.offsetWidth;

      firstOffset = getElRefOffset(
        param.el,
        param.axis === 'vertical' ? 'top' : 'left',
        param.ref
      );
      param.elOffsets = [firstOffset, firstOffset + param.elSize];
    } else {
      // If param.el not set, param.elOffsets shoud be set instead
      param.elSize = param.elOffsets[1] - param.elOffsets[0];
    }

    scrollElIntoView(
      param.ref,
      param.axis,
      param.elOffsets,
      param.elSize,
      param.padding
    );
  };
})();

// Add blob to canvas element if browser (Edge) doesn't support the method
const addBlobIfNeeded = () => {
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value(callback, type, quality) {
        const dataURL = this.toDataURL(type, quality).split(',')[1];
        setTimeout(() => {
          const binStr = atob(dataURL);
          const len = binStr.length;
          const arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], { type: type || 'image/png' }));
        });
      },
    });
  }
};

const resizeImageIfNeeded = (maxSize, sizeObj) => {
  let { width, height } = sizeObj;
  if (maxSize) {
    if (width > height && width > maxSize) {
      height *= maxSize / width;
      width = maxSize;
    } else if (height > width && height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }
  }
  return { width, height };
};

const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const isEdge = () => window.navigator.userAgent.indexOf('Edge') > -1;

// Internet Explorer 6-11
const isIE = () => /*@cc_on!@*/ false || !!document.documentMode;

export {
  scrollIntoView,
  getStillDataUriFromGif,
  resizeImageIfNeeded,
  addBlobIfNeeded,
  isSafari,
  isEdge,
  isIE,
};
