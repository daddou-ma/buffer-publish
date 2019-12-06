/**
 * Component that displays a thumbnail that fits the width of its container
 */

import React from 'react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import { LinkAttachmentTextFieldTypes } from '../AppConstants';
import styles from './css/LinkAttachmentTextEditor.css';

class LinkAttachmentTextEditor extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    canBeEdited: PropTypes.bool.isRequired,
  };

  onLinkFieldKeyDown = e => {
    // Prevent inserting line breaks in link title
    if (this.props.type === LinkAttachmentTextFieldTypes.TITLE) {
      if (e.key === 'Enter') e.preventDefault();
    }
  };

  onLinkFieldChange = e => {
    if (this.props.type === LinkAttachmentTextFieldTypes.TITLE) {
      ComposerActionCreators.updateDraftLinkTitle(
        this.props.draftId,
        e.target.value
      );
    } else if (this.props.type === LinkAttachmentTextFieldTypes.DESCRIPTION) {
      ComposerActionCreators.updateDraftLinkDescription(
        this.props.draftId,
        e.target.value
      );
    }
  };

  render() {
    const { value, type, canBeEdited } = this.props;

    let placeholder;
    if (type === LinkAttachmentTextFieldTypes.TITLE) {
      placeholder = 'No title';
    } else if (type === LinkAttachmentTextFieldTypes.DESCRIPTION) {
      placeholder = 'No description';
    }

    const textFieldClassName =
      type === LinkAttachmentTextFieldTypes.TITLE
        ? canBeEdited
          ? styles.editableTitle
          : styles.title
        : type === LinkAttachmentTextFieldTypes.DESCRIPTION
        ? canBeEdited
          ? styles.editableDescription
          : styles.description
        : null;

    return (
      <div>
        {canBeEdited ? (
          <Textarea
            className={textFieldClassName}
            onKeyDown={this.onLinkFieldKeyDown}
            onChange={this.onLinkFieldChange}
            value={value}
            placeholder={placeholder}
          />
        ) : (
          <p className={textFieldClassName}>{value}</p>
        )}
      </div>
    );
  }
}

export default LinkAttachmentTextEditor;
