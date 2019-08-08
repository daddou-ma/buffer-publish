import React from 'react';
import PropTypes from 'prop-types';

import icona from 'tui-image-editor/dist/svg/icon-a.svg';
import iconb from 'tui-image-editor/dist/svg/icon-b.svg';
import iconc from 'tui-image-editor/dist/svg/icon-c.svg';
import icond from 'tui-image-editor/dist/svg/icon-d.svg';

import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';



import Modal from '../__legacy-buffer-web-shared-components__/modal/modal';



//const bg = require('tui-image-editor/examples/img/bg.png')


class ImageEditorWrapper extends React.Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.editorRef = React.createRef();
  }

  componentDidMount() {
    const rootElement = this.editorRef.current.getInstance();
    console.debug(rootElement);

    rootElement.loadImageFromURL = (function () {
      const cachedFunction = rootElement.loadImageFromURL;
      function waitUntilImageEditorIsUnlocked(imageEditor) {
        return new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (!imageEditor._invoker._isLocked) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });
      }
      return function () {
        return waitUntilImageEditorIsUnlocked(rootElement).then(() => cachedFunction.apply(this, arguments));
      };
    }());

    // It works with a sample image like:
    // https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/526px-Wikipedia-logo-v2.svg.png
    // Load an image and tell our tui imageEditor instance the new and the old image size:
    rootElement.loadImageFromURL(this.props.src, 'SampleImage').then((result) => {
      rootElement.ui.resizeEditor({
        imageSize: {
          oldWidth: result.oldWidth,
          oldHeight: result.oldHeight,
          newWidth: result.newWidth,
          newHeight: result.newHeight,
        },
      });
    }).catch((err) => {
      console.error('Something went wrong:', err);
    });
  }

  render() {
    const { src, height, width } = this.props;

    console.debug(icond);

    const myTheme = {
      'menu.normalIcon.path': 'https://publish.local.buffer.com/toast-image-editor-icon-d.svg',
      'menu.activeIcon.path': 'https://publish.local.buffer.com/toast-image-editor-icon-b.svg',
      'menu.disabledIcon.path': 'https://publish.local.buffer.com/toast-image-editor-icon-a.svg',
      'menu.hoverIcon.path': 'https://publish.local.buffer.com/toast-image-editor-icon-c.svg',
    };

    return (
      <Modal>
        <ImageEditor
          ref={this.editorRef}
          includeUI={{
            loadImage: {
              path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
              name: 'Blank',
            },
            theme: myTheme,
            menu: ['shape', 'filter'],
            initMenu: 'filter',
            uiSize: {
              width: '800px',
              height: '600px',
            },
            menuBarPosition: 'bottom',
          }}
          cssMaxHeight={500}
          cssMaxWidth={700}
          selectionStyle={{
            cornerSize: 20,
            rotatingPointOffset: 70,
          }}
          usageStatistics={false}
        />
      </Modal>
    );
  }
}

export default ImageEditorWrapper;
