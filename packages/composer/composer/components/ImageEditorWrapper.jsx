import React from 'react';
import PropTypes from 'prop-types';
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';

import Modal from '../__legacy-buffer-web-shared-components__/modal/modal';


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

  // componentDidMount() {
  //   const rootElement = this.editorRef.current.getRootElement();

  //   rootElement.loadImageFromURL = (function () {
  //     const cachedFunction = rootElement.loadImageFromURL;
  //     function waitUntilImageEditorIsUnlocked(imageEditor) {
  //       return new Promise((resolve, reject) => {
  //         const interval = setInterval(() => {
  //           if (!imageEditor._invoker._isLocked) {
  //             clearInterval(interval);
  //             resolve();
  //           }
  //         }, 100);
  //       });
  //     }
  //     return function () {
  //       return waitUntilImageEditorIsUnlocked(rootElement).then(() => cachedFunction.apply(this));
  //     };
  //   }());

  //   // Load an image and tell our tui imageEditor instance the new and the old image size:
  //   rootElement.loadImageFromURL(this.src, 'SampleImage').then((result) => {
  //     rootElement.ui.resizeEditor({
  //       imageSize: {
  //         oldWidth: result.oldWidth,
  //         oldHeight: result.oldHeight,
  //         newWidth: result.newWidth,
  //         newHeight: result.newHeight,
  //       },
  //     });
  //   }).catch((err) => {
  //     console.error('Something went wrong:', err);
  //   });

  //   window.addEventListener('resize', () => {
  //     rootElement.ui.resizeEditor();
  //   });
  // }




  // imageEditor.loadImageFromURL = (function () {
  //   var cached_function = imageEditor.loadImageFromURL;
  //   function waitUntilImageEditorIsUnlocked(imageEditor) {
  //     return new Promise((resolve, reject) => {
  //       const interval = setInterval(() => {
  //         if (!imageEditor._invoker._isLocked) {
  //           clearInterval(interval);
  //           resolve();
  //         }
  //       }, 100);
  //     })
  //   }
  //   return function () {
  //     return waitUntilImageEditorIsUnlocked(imageEditor).then(() => cached_function.apply(this, arguments));
  //   };
  // })();

  render() {
    const { src, height, width } = this.props;

    const myTheme = {
      // Theme object to extends default dark theme.
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
              width: '1000px',
              height: '700px',
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
