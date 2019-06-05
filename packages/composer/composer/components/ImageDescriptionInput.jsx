import React from 'react';
import PropTypes from 'prop-types';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import ModalActionCreators from '../__legacy-buffer-web-shared-components__/modal/actionCreators';
import Input from '../components/Input';
import CharacterCount from './CharacterCount';
import styles from './css/ImageDescriptionInput.css';
import { Button } from '@bufferapp/components';

class ImageDescriptionInput extends React.Component {
  static propTypes = {
    draftId: PropTypes.string,
    mediaAttachment: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      altText: this.props.mediaAttachment.altText || '',
      saveButtonText: 'Save',
      count: 0,
    };
  }

  handleChange = (e) => {
    this.setState({
      altText: e.target.value,
      saveButtonText: 'Save',
      count: e.target.value.length,
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.saveButtonText === 'Save' && this.state.saveButtonText === 'Saved!') {
      setTimeout(() => {
        ModalActionCreators.closeModal();
      }, 800);
    }
  };

  onClick = () => {
    ComposerActionCreators.updateImageAltText(this.props.mediaAttachment, this.state.altText);
    this.setState({ saveButtonText: 'Saved!' });
  }

  render() {
    return (
      <div className={styles.container}>
        <Input
          className={styles.textInput} type="text"
          value={this.state.altText} onChange={this.handleChange}
          placeholder="Add a description for people with visual impairments"
        />
        <CharacterCount count={this.state.count} maxCount={420} className={styles.charCount} />
          <div className={styles.button}>
            <Button onClick={this.onClick} disabled={this.state.count > 420}>
              {this.state.saveButtonText}
            </Button>
          </div>
      </div>
    );
  }
}

export default ImageDescriptionInput;
