import React from 'react';
import EmptyTextAlert from '../components/EmptyTextAlert';
import MediaZoomBox from '../components/MediaZoomBox';
import ImageEditorWrapper from '../components/ImageEditorWrapper';
import InstagramThumbnailEditor from '../components/InstagramThumbnailEditor';
import Store from '../__legacy-buffer-web-shared-components__/modal/store.js';

const getState = () => Store.getCurrentState();

const ModalComponents = {
  EmptyTextAlert,
  MediaZoomBox,
  InstagramThumbnailEditor,
  ImageEditorWrapper,
};

class Modals extends React.Component {
  constructor(props) {
    super(props);
    this.state = Store.getInitialState();
  }

  componentDidMount = () => Store.addChangeListener(this.onChange);

  componentWillUnmount = () => Store.removeChangeListener(this.onChange);

  onChange = () => this.setState(getState());

  render() {
    const ModalToShow = ModalComponents[this.state.modalName] || 'span';

    return (
      <div>
        {this.state.open && <ModalToShow {...this.state.modalProps} />}
      </div>
    );
  }
}

export default Modals;
