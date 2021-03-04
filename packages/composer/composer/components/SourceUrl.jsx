import React from 'react';
import PropTypes from 'prop-types';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import Input from '../components/Input';
import styles from './css/SourceUrl.css';

class SourceUrl extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    sourceUrl: PropTypes.string,
  };

  static defaultProps = {
    sourceUrl: null,
  };

  saveSourceUrl = e => {
    const newSourceUrl = e.target.value;
    ComposerActionCreators.updateDraftSourceLink(
      this.props.draftId,
      newSourceUrl
    );
  };

  render() {
    return (
      <span className={styles.sourceUrlContainer}>
        <span className={styles.sourceUrlLabel}>Destination URL: </span>
        <Input
          value={this.props.sourceUrl}
          placeholder="Enter destination URL..."
          onChange={this.saveSourceUrl}
          className={styles.sourceUrlInput}
        />
      </span>
    );
  }
}

export default SourceUrl;
